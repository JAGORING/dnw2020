from django.urls import path
from . import views as color_views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'color'

urlpatterns = [
    path('', color_views.getColor, name="getColor"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)