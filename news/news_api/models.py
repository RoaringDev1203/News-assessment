from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name
class Image(models.Model):
    image = models.ImageField(upload_to='news_images/')
    news = models.ForeignKey('News', related_name='images', on_delete=models.CASCADE)



class News(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()
    tags = models.ManyToManyField(Tag, related_name='news')
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

    def __str__(self):
        return self.title
