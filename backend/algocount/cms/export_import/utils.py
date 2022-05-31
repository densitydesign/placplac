from cms.models import Project, StepDownload, ExperimentAdditionalMaterial, ProjectMedia


def get_paths_to_copy(*, project:Project):
    downloads = [download.file.path for download in StepDownload.objects.filter(step__experiment__project=project)]
    additional_materials = [additional_material.file.path for additional_material in ExperimentAdditionalMaterial.objects.filter(experiment__project=project)]
    project_media =[media.file.path for media in ProjectMedia.objects.filter(project=project)]
    return downloads + additional_materials + project_media
