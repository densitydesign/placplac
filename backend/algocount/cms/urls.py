from rest_framework.routers import DefaultRouter

from cms import views

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet, basename='projects')
router.register(r'project-collaborators', views.ProjectUserViewSet, basename='project-collaborators')
router.register(r'experiments', views.ExperimentViewSet, basename='experiments')
router.register(r'media', views.ProjectMediaViewSet, basename='media')
router.register(r'glossary-categories', views.GlossaryCategoryViewSet, basename='glossary-categories')
router.register(r'glossary-terms', views.GlossaryTermViewSet, basename='glossary-terms')
router.register(r'steps', views.StepViewSet, basename='steps')
