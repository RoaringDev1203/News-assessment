# Generated by Django 5.0.6 on 2024-06-03 08:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('news_api', '0005_rename_pictures_news_picture'),
    ]

    operations = [
        migrations.RenameField(
            model_name='news',
            old_name='picture',
            new_name='pictures',
        ),
    ]
