from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFit, ResizeToFill, Thumbnail

# Create your models here.

class Category(models.Model):
    cate_id = models.IntegerField()
    cate_name = models.CharField(max_length=16)

class Month(models.Model):
    month = models.IntegerField()

class Temp(models.Model):
    temp = models.IntegerField()

class Cloth(models.Model):
    product_id = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    cloth_type = models.CharField(max_length=16)
    color = models.CharField(max_length=16)
    pattern = models.CharField(max_length=16)
    month = models.ForeignKey(Month, on_delete=models.CASCADE)
    temp = models.ForeignKey(Temp, on_delete=models.CASCADE)
    label = models.CharField(max_length=16)
    img_url = models.CharField(max_length=300)
    user_clothes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="my_clothes")

class Closet(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    clothes = models.ManyToManyField(Cloth, related_name="closets")

class Codicup(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    top_url = models.CharField(max_length=300, blank=True)
    bot_url = models.CharField(max_length=300, blank=True)
    out_url = models.CharField(max_length=300, blank=True)
    one_url = models.CharField(max_length=300, blank=True)

class Article(models.Model):
    contents = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    user_likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="article_likes")
    domColor = models.CharField(max_length=40, blank=True)
    palColor1 = models.CharField(max_length=40, blank=True)
    palColor2 = models.CharField(max_length=40, blank=True)
    palColor3 = models.CharField(max_length=40, blank=True)
    palColor4 = models.CharField(max_length=40, blank=True)
    image = models.ImageField(blank=True)
    image_thumbnail = ImageSpecField(
        source='image',
        processors=[ResizeToFit(1000,1000)],
        format='JPEG',
        options={'quality':100}
    )
