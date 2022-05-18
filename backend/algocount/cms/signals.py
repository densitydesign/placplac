from pathlib import Path

from django.contrib.staticfiles.finders import find
from django.core.files.base import ContentFile
from django.db.models.signals import post_save
from django.dispatch import receiver

from cms.models import GlossaryCategory, Project, ProjectMedia


def create_default_media (file_path,project,description):
    path = Path(find(file_path))
    file = ContentFile(path.open(mode='rb').read(), name=path.name)
    return ProjectMedia.objects.create(file=file, project=project, description=description)


@receiver(post_save, sender=Project)
def create_categories(sender, instance, created, **kwargs):
    if created:
        # GlossaryCategory.objects.get_or_create(title="Techniques",
        #                  description="A list of basic methods for making and replicating the procedures present throughout the experiments.",
        #                  color="#FF6B6B", project=instance)
        # GlossaryCategory.objects.get_or_create(title="Tools",
        #                  description="We careful try to choose online, free and open tools and web apps.",
        #                  color="#000000", project=instance)
        if instance.footer is None:
            cariplo_logo = create_default_media("media-frontend/cariplo.png",instance,"Cariplo logo")
            density_logo = create_default_media("media-frontend/density.png",instance,"Density logo")
            poli_logo = create_default_media("media-frontend/poli.png",instance,"Poli logo")
            uni_logo = create_default_media("media-frontend/uni.png",instance,"Uni logo")
            instance.footer={"partners":[{"link":"https://www.unimi.it", "image":uni_logo.file.url},
                                         {"link":"https://www.polimi.it", "image":poli_logo.file.url},
                                         {"link":"https://www.densitydesign.org", "image":density_logo.file.url}],
                             "founded_by":[{"link":"https://www.fondazionecariplo.it", "image":cariplo_logo.file.url}]}
            instance.save()

