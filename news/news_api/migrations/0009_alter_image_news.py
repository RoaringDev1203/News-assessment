# Generated by Django 5.0.6 on 2024-06-03 10:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news_api', '0008_remove_news_images_image_news'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='news',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='news_api.news'),
        ),
    ]
