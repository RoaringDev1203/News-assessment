from rest_framework import viewsets, status
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import News, Tag
from .serializers import NewsSerializer, TagSerializer
import logging

logger = logging.getLogger(__name__)


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        logger.info(f'News item {instance.id} deleted successfully')
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        news = self.get_object()
        news.likes += 1
        news.save()
        return Response({'status': 'like added', 'likes': news.likes})

    @action(detail=True, methods=['post'])
    def dislike(self, request, pk=None):
        news = self.get_object()
        news.dislikes += 1
        news.save()
        return Response({'status': 'dislike added', 'dislikes': news.dislikes})

    
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
