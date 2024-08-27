from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NewsViewSet, TagViewSet

router = DefaultRouter()
router.register(r'news', NewsViewSet)
router.register(r'tags', TagViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
