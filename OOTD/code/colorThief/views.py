import sys
if sys.version_info < (3, 0):
    from urllib2 import urlopen
else:
    from urllib.request import urlopen

import io
import os
import json
from colorthief import ColorThief
from django.shortcuts import render , HttpResponse, redirect
from django.conf import settings
# from ootd import settings
# from config import settings
# Create your views here.

def getColor(request):
    id = request.POST["id"]
    image_url = os.path.join(settings.MEDIA_ROOT, request.POST["img_url"]) 
    print(image_url)
    color_thief = ColorThief(image_url)
    
    # print(img_root)
    # Image.open(img_root)
    # fd = urlopen('http://lokeshdhakar.com/projects/color-thief/img/photo1.jpg')
    # fd = img_url
    # f = io.BytesIO(fd.read())
    # color_thief = ColorThief('/Users/ming/OOTD/OOTDweb/media/스크린샷_2019-03-29_오후_6.01.51_t3qhWj3.png')
    # color_thief = ColorThief(img_url)
    # /Users/ming/OOTD/OOTDweb/media/스크린샷_2019-03-29_오후_6.01.51_t3qhWj3.png
    # OOTDweb/media/스크린샷_2019-03-29_오후_6.01.51_t3qhWj3.png
    # color_thief = ColorThief(img_root)
    dominant_color = color_thief.get_color(quality=1)
    print(dominant_color)
    # build a color palette
    palette = color_thief.get_palette(color_count=4)
    palettes = []
    for p in palette:
        print(p)
        palettes.append(p)
    # print(palette)
    context = {
        'dominant_color': dominant_color,
        'palettes': palettes
    }
    return HttpResponse(json.dumps(context), status=200, content_type='application/json')



