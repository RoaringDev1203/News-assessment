from rest_framework import serializers
from .models import News, Tag, Image

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image']

class NewsSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(max_length=100), write_only=True, required=False)
    tags_info = TagSerializer(source='tags', many=True, read_only=True)
    images = ImageSerializer(many=True, read_only=True)
    picture_urls = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = ['id', 'title', 'text', 'tags', 'tags_info', 'likes', 'dislikes', 'images', 'picture_urls']

    def get_picture_urls(self, obj):
        request = self.context.get('request')
        if obj.images.exists() and request:
            return [request.build_absolute_uri(image.image.url) for image in obj.images.all()]
        return []

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        news = News.objects.create(**validated_data)

        for tag_name in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            news.tags.add(tag)

        images_data = self.context['request'].FILES.getlist('images')
        for image_data in images_data:
            Image.objects.create(image=image_data, news=news)

        return news

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', None)

        instance.title = validated_data.get('title', instance.title)
        instance.text = validated_data.get('text', instance.text)
        instance.likes = validated_data.get('likes', instance.likes)
        instance.dislikes = validated_data.get('dislikes', instance.dislikes)

        instance.save()

        if tags_data is not None:
            instance.tags.clear()
            for tag_name in tags_data:
                tag, _ = Tag.objects.get_or_create(name=tag_name)
                instance.tags.add(tag)

        images_data = self.context['request'].FILES.getlist('images')
        if images_data:
            instance.images.all().delete()
            for image_data in images_data:
                Image.objects.create(image=image_data, news=instance)

        return instance
