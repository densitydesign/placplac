from rest_framework.routers import DefaultRouter

from cms import views

router = DefaultRouter()
router.register(r'projects', views.project.ProjectViewSet, basename='projects')
router.register(r'project-collaborators', views.project.ProjectUserViewSet, basename='project-collaborators')
router.register(r'experiments', views.experiment.ExperimentViewSet, basename='experiments')
router.register(r'project-media', views.project.ProjectMediaViewSet, basename='media')
router.register(r'glossary-categories', views.glossary.GlossaryCategoryViewSet, basename='glossary-categories')
router.register(r'glossary-terms', views.glossary.GlossaryTermViewSet, basename='glossary-terms')
router.register(r'references', views.reference.ReferenceViewSet, basename='references')
router.register(r'steps', views.step.StepViewSet, basename='steps')
router.register(r'step-downloads', views.step.StepDownloadViewSet, basename='step-downloads')
router.register(r'experiment-additional-material',
                views.experiment.ExperimentAdditionalMaterialViewSet, basename='experiment-additional-material')
