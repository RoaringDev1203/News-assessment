# Generated by Django 5.0.6 on 2024-06-03 10:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news_api', '0007_image_remove_news_pictures_news_images'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='news',
            name='images',
        ),
        migrations.AddField(
            model_name='image',
            name='news',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='news_api.news'),
        ),
    ]
