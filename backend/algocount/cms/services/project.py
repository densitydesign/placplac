import datetime
from pathlib import Path
from typing import List

from django.contrib.staticfiles.finders import find
from django.core.files.base import ContentFile
from django.db import transaction
from rest_framework import exceptions
from rest_framework.exceptions import ValidationError

from authentication.models import User
from base.services import model_update
from cms.models import GlossaryCategory, Project, ProjectMedia, ProjectUser
from cms.selectors.project import user_has_delete_project_permissions, user_has_change_project_permissions


def get_all_relation_objects(relation_set):
    related_objects = []
    for related in relation_set.all():
        related.pk = None
        related._state.adding = True
        related_objects.append(related)
    return related_objects


def save_new_relation_objects(objects_list, field: str, related_obj):
    for obj in objects_list:
        setattr(obj, field, related_obj)
        obj.save()


def clone_simple_relation(relation_set, project):
    for related in relation_set.all():
        new_related = related
        new_related.pk = None
        new_related._state.adding = True
        new_related.project = project
        new_related.save()


def create_default_media(file_path, project, description):
    path = Path(find(file_path))
    file = ContentFile(path.open(mode='rb').read(), name=path.name)
    return ProjectMedia.objects.create(file=file, project=project, description=description)


def create_project_defaults(*, project: Project):
    GlossaryCategory.objects.get_or_create(title="Techniques",
                                           description="A list of basic methods for making and replicating the procedures present throughout the experiments.",
                                           color="#FF6B6B", project=project)
    GlossaryCategory.objects.get_or_create(title="Tools",
                                           description="We careful try to choose online, free and open tools and web apps.",
                                           color="#000000", project=project)
    if len(project.cover_images) <= 0:
        covers = [create_default_media("media-frontend/circles.svg", project, "Circles"),
                  create_default_media("media-frontend/oval.svg", project, "Oval"),
                  create_default_media("media-frontend/square.svg", project, "Square"),
                  create_default_media("media-frontend/square2.svg", project, "Square 2")]
        project.cover_images = [cover.file.url for cover in covers]
    if project.footer is None:
        cariplo_logo = create_default_media("media-frontend/cariplo.png", project, "Cariplo logo")
        density_logo = create_default_media("media-frontend/density.png", project, "Density logo")
        poli_logo = create_default_media("media-frontend/poli.png", project, "Poli logo")
        uni_logo = create_default_media("media-frontend/uni.png", project, "Uni logo")
        project.footer = {"partners": [{"link": "https://www.unimi.it", "image": uni_logo.file.url},
                                       {"link": "https://www.polimi.it", "image": poli_logo.file.url},
                                       {"link": "https://www.densitydesign.org", "image": density_logo.file.url}],
                          "founded_by": [{"link": "https://www.fondazionecariplo.it", "image": cariplo_logo.file.url}]}
    project.save()


@transaction.atomic
def create_project(*, user_request: User, title: str,
                   short_description: str = None,
                   project_explanation: str = None,
                   experiments_description: str = None,
                   long_description: str = None,
                   status: Project.StatusChoices = Project.StatusChoices.DRAFT,
                   language: Project.LanguageChoices = Project.LanguageChoices.EN,
                   footer: str = None,
                   glossary_description: str = None,
                   cover_images: List[str] = None,
                   create_defaults: bool = True):
    cover_images = cover_images if cover_images else []
    project = Project.objects.create(title=title,
                                     short_description=short_description,
                                     project_explanation=project_explanation,
                                     experiments_description=experiments_description,
                                     long_description=long_description,
                                     status=status,
                                     language=language,
                                     footer=footer,
                                     glossary_description=glossary_description,
                                     last_update=datetime.datetime.now(),
                                     cover_images=cover_images)
    add_user_to_project(user=user_request, level=ProjectUser.LevelChoices.AUTHOR, project=project)

    if create_defaults:
        create_project_defaults(project=project)
    return project


def update_project(*, project: Project, data: dict):
    fields = ["title",
              "short_description",
              "project_explanation",
              "experiments_description",
              "long_description",
              "status",
              "language",
              "footer",
              "glossary_description",
              "cover_images"]
    project, updated = model_update(instance=project, fields=fields, data=data)
    if updated:
        project.last_update = datetime.datetime.now()
        project.save()
    return project


def delete_project(*, project: Project):
    project.delete()


@transaction.atomic
def clone_project(*, project: Project, user_request: User):
    new_instance = create_project(user_request=user_request, title=project.title,
                                  short_description=project.short_description,
                                  project_explanation=project.project_explanation,
                                  experiments_description=project.experiments_description,
                                  long_description=project.long_description,
                                  status=project.status,
                                  language=project.language,
                                  footer=project.footer,
                                  glossary_description=project.glossary_description,
                                  create_defaults=False)

    clone_simple_relation(project.projectmedia_set, new_instance)
    clone_simple_relation(project.reference_set, new_instance)

    for glossary_term in project.glossaryterm_set.all():
        glossary_category = GlossaryCategory.objects.get_or_create(project=new_instance,
                                                                   title=glossary_term.glossary_category.title,
                                                                   description=glossary_term.glossary_category.description,
                                                                   color=glossary_term.glossary_category.color)
        new_glossary_term = glossary_term
        new_glossary_term.glossary_category = glossary_category
        new_glossary_term.pk = None
        new_glossary_term._state.adding = True
        new_glossary_term.project = new_instance
        new_glossary_term.save()

    for experiment in project.experiment_set.all():
        additional_materials = get_all_relation_objects(experiment.experimentadditionalmaterial_set)
        steps = []
        for step in experiment.step_set.all():
            step_downloads = get_all_relation_objects(step.stepdownload_set)
            step.pk = None
            step._state.adding = True
            steps.append([step, step_downloads])

        experiment.pk = None
        experiment._state.adding = True
        experiment.project = new_instance
        experiment.save()
        save_new_relation_objects(additional_materials, "experiment", experiment)
        for step in steps:
            step[0].experiment = experiment
            step[0].save()
            save_new_relation_objects(step[1], "step", step[0])

    return new_instance


def add_user_to_project(*, project: Project,
                        user: User,
                        level: ProjectUser.LevelChoices = ProjectUser.LevelChoices.COLLABORATOR,
                        request_user: User = None):
    # we check for delete permissions because it checks if the request_user is the author
    if request_user and not user_has_delete_project_permissions(project=project, user=request_user):
        raise ValidationError({"project": ["Project not found!"]})
    project_user = ProjectUser.objects.create(project=project, user=user, level=level)
    return project_user


def remove_user_from_project(*, project_user: ProjectUser):
    project_user.delete()


def create_project_media(*, request_user: User,
                         project: Project,
                         file: str,
                         description: str,
                         type: ProjectMedia.FileTypeChoices):
    if request_user and not user_has_change_project_permissions(project=project, user=request_user):
        raise ValidationError({"project": ["Project not found!"]})
    project_media = ProjectMedia.objects.create(project=project, file=file, description=description, type=type)
    return project_media


def delete_project_media(*, project_media: ProjectMedia):
    project_media.delete()
