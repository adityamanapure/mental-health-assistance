from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResourceViewSet

router = DefaultRouter()
router.register('resources', ResourceViewSet, basename='resource')

urlpatterns = [
    path('', include(router.urls)),
]