import json
import math
import random
import requests
from datetime import datetime
from django.shortcuts import render , HttpResponse, redirect, get_object_or_404
from datetime import datetime
from urllib.request import urlopen
from .weather1 import get_tmn_data , get_tmx_data
from .weather2 import get_forecast_data , ForecastTimeData
from .models import Cloth
from .models import Cloth, Closet, Category, Month, Temp, Codicup
from .models import Article
from PIL import Image
from django.db.models import Q
from django.contrib.auth.decorators import login_required # 로그인권한부여
from django.views.decorators.http import require_POST


def home(request):
    articles = Article.objects.all().order_by("-created_at")[:4]
    # articles = Article.objects.all().order_by("created_at")
    articles_like = Article.objects.all().order_by("-created_at")[:4]

    context = {
        'articles': articles
    }
    return render(request, 'index.html', context)

@login_required
def codiWorldcup(request):
    now = datetime.now()
    nowMonth = now.month
    # print("##############")
    # print(type(now.month))

    id = request.user.id
    
    top = Cloth.objects.filter(Q(category_id=1) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()
    outer = Cloth.objects.filter(Q(category_id=2) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()
    bottom = Cloth.objects.filter((Q(category_id=4)|Q(category_id=3)) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()
    onepiece = Cloth.objects.filter(Q(category_id=5) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()

    top_len = len(top)
    out_len = len(outer)
    bot_len = len(bottom)
    one_len = len(onepiece)
    # print(top_len)
    # print(out_len)
    # print(bot_len)
    print(one_len)

    if top_len>=4 and len(outer)>= 4 and len(bottom)>=4 and len(onepiece)>=2:
        ran_top = random.sample(list(top),4)
        ran_bot = random.sample(list(bottom),4)
        ran_out = random.sample(list(outer),4)
        top1=ran_top[:2]
        top2=ran_top[2:4]
        bot1=ran_bot[:2]
        bot2=ran_bot[2:4]
        out1=ran_out[:2]
        out2=ran_out[2:4]
        ran_one = random.sample(list(onepiece),2)
        out1=ran_out[:2]
        out2=ran_out[2:4]

        context1 ={
            'top1':top1,
            'top2':top2,
            'bot1':bot1,
            'bot2':bot2,
            'out1':out1,
            'out2':out2,
            'ran_one':ran_one
        }
        return render(request, 'codi/codiWorldcup.html', context1)
    # if len(outer)>= 4 and len(onepiece)>=2 :
    #     ran_out = random.sample(list(outer),4)
    #     ran_one = random.sample(list(onepiece),2)
    #     out1=ran_out[:2]
    #     out2=ran_out[2:4]

    #     context1 ={
    #         'out1':out1,
    #         'out2':out2,
    #         'ran_one':ran_one
    #     }
    #     return render(request, 'codi/codiWorldcup.html', context1)

    # print("*******")
    # print(top_len)
    # print(out_len)
    # print(bot_len)
    # print(one_len)
    context={
        'top_len': top_len,
        'out_len': out_len,
        'bot_len': bot_len,
        'one_len': one_len
    }
    return HttpResponse(json.dumps(context), status=401, content_type='application/json')

@login_required
def checkMyCloset(request):
    id = request.user.id
    minT = int(request.POST["min"])
    maxT = int(request.POST["max"])
    # print(minT)
    # print(maxT)
    nowMonth = request.POST["nowMonth"]
    # nowMonth = int(nowDate[4:6])
    # print("###########")
    # print(nowDate)
    # print(nowMonth)
    # print(type(nowDate))
    # print(min)
    # print(max)
    temps = list(range(minT, maxT+1))
    # print(temps)
    if int(request.POST["result"]) == 3:
        tops = Cloth.objects.filter(Q(category_id=1) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()
        outers = Cloth.objects.filter(Q(category_id=2) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()
        bottoms = Cloth.objects.filter((Q(category_id=4)|Q(category_id=3)) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()
        onepieces = Cloth.objects.filter(Q(category_id=5) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()
        # print("### 3P ###")
        top_len = len(tops)
        out_len = len(outers)
        bot_len = len(bottoms)
        one_len = len(onepieces)

        # print(top_len)
        # print(out_len)
        # print(bot_len)
        # print(one_len)
        if len(tops) >=4 and len(outers) >=4 and len(bottoms) >=4:
            # print("3hi")
            context = {
                'top_len': top_len,
                'out_len': out_len,
                'bot_len': bot_len,
                'one_len': one_len
            }
            return HttpResponse(json.dumps(context), status=200, content_type='application/json')
        else :
            context = {
                'top_len': top_len,
                'out_len': out_len,
                'bot_len': bot_len,
                'one_len': one_len
            }
            return render(request, 'codi/codiWorldcup.html', context)
            # return HttpResponse(json.dumps(context), status=401, content_type='application/json')
    
    elif int(request.POST["result"]) == 2: 
        tops = Cloth.objects.filter(Q(category_id=1) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()
        bottoms = Cloth.objects.filter((Q(category_id=4)|Q(category_id=3)) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()
        onepieces = Cloth.objects.filter(Q(category_id=5) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()
        outers = Cloth.objects.filter(Q(category_id=2) & Q(month=nowMonth) & Q(user_clothes__id=id)).values('img_url').distinct()
        # print("### 2P ###")
        top_len = len(tops)
        out_len = len(outers)
        bot_len = len(bottoms)
        one_len = len(onepieces)

        # print(top_len)
        # print(out_len)
        # print(bot_len)
        # print(one_len)

        if len(onepieces) >=2 and len(outers) >=4:
            # print("2hi")
            context = {
                'top_len': top_len,
                'out_len': out_len,
                'bot_len': bot_len,
                'one_len': one_len
            }
            return HttpResponse(json.dumps(context), status=200, content_type='application/json')
        else :
            context = {
                'top_len': top_len,
                'out_len': out_len,
                'bot_len': bot_len,
                'one_len': one_len
            }
            return render(request, 'codi/codiWorldcup.html', context)
            # return HttpResponse(json.dumps(''), status=200, content_type='application/json')


@login_required
def addCodicupResult(request):
    codicup = Codicup()
    c = Codicup.objects.all()
    result = request.POST["result"]
    id = request.user.id
    if int(result) == 3:
        top_url = request.POST["top_url"]
        bot_url = request.POST["bot_url"]
        out_url = request.POST["out_url"]
        codicup.top_url = top_url
        codicup.bot_url = bot_url
        codicup.out_url = out_url
        codicup.user_id = id
        codicup.save()
    elif int(result) == 2:
        one_url = request.POST["one_url"]
        out_url = request.POST["out_url"]
        codicup.one_url = one_url
        codicup.out_url = out_url
        codicup.user_id = id
        codicup.save()
    
    context={}
    return HttpResponse(json.dumps(context), status=200, content_type='application/json')

@login_required
def codicupResult(request):
    id = request.user.id
    codicups = Codicup.objects.filter(user_id=id).order_by('-created_at')
    threePcups = []
    twoPcups = []
    for cup in codicups:
        print(cup.created_at)
        if cup.top_url == "":
            twoPcups.append(cup)
            print("2P")
        else :
            threePcups.append(cup)
            print("3P")
    context = {
        'twoPcups': twoPcups,
        'threePcups': threePcups
    }
    return render(request, 'codi/codicupResult.html', context)

def likes(request):
    if request.method == "POST" and request.user.is_authenticated:
        article_id = request.POST["article_id"]
        article = Article.objects.get(id=article_id)
        if request.user in article.user_likes.all():
            article.user_likes.remove(request.user) # 좋아요 취소
        else:
            article.user_likes.add(request.user) # 좋아요
            
        likes_count = len(article.user_likes.all())
        print(likes_count)
        context = {
            'count': likes_count
        }
        return HttpResponse(json.dumps(context), content_type="application/json")
    else: 
        return HttpResponse('', status=403)


@login_required
def codiBook(request):
    # user_id = request.user.id 
    # print(user_id)
    if request.method == "POST":
        if request.user.is_authenticated:
            article = Article()
            article.contents = request.POST['contents']
            article.user_id = request.user.id  
            article.save()

            # 원본 이미지 저장
            article.image = request.FILES['image'] 
            # 원본 이미지를 프로세싱 한 이미지 저장
            article.image_resized = request.FILES["image"]
            article.save(0)
            # for image in request.FILES.getlist("image"):
            #     ArticleImages.objects.create(article_id=article.id, image=image)
            return redirect('codi:codiBook')
        else:
            return redirect('codi:codi')
    else:
        id = request.user.id
        articles = Article.objects.filter(user_id=id).order_by("-created_at")
        context = {
            'articles': articles
        }
        return render(request, 'codi/codiBook.html', context)

@login_required
def addColor(request):
    id = request.POST['id']
    rgb = request.POST['rgb']
    prgb1 = request.POST['prgb1']
    prgb2 = request.POST['prgb2']
    prgb3 = request.POST['prgb3']
    prgb4 = request.POST['prgb4']
    # print(rgb)
    # print(prgb1)
    # print(prgb2)
    # print(prgb3)
    # print(prgb4)
    article = Article.objects.get(id=id)
    # print(article)
    # print(article.domColor)
    article.domColor = rgb
    article.palColor1 = prgb1
    article.palColor2 = prgb2
    article.palColor3 = prgb3
    article.palColor4 = prgb4
    article.save()
    # print(article.domColor)
    return HttpResponse(json.dumps(''), status=200, content_type='application/json')

@login_required
def delete(request, article_id):
    article = Article.objects.get(id=article_id)
    article.delete()
    return redirect('codi:codiBook')

@login_required
def allCodiBook(request):
    articles = Article.objects.all().order_by("-created_at")
    context = {
        'articles': articles
    }
    return render(request, 'codi/allCodiBook.html', context)

@login_required
def codiBooks(request, user_id):
    articles = Article.objects.filter(user_id=user_id).order_by("-created_at")
    user_name = articles[0].user.username
    context = {
        'articles': articles,
        'user_name': user_name,
    }
    return render(request, 'codi/codiBooks.html', context)

@login_required
def mypage(request):
    return render(request, 'codi/mypage.html')

@login_required
def myCloset(request):
    id = request.user.id

    tops = Cloth.objects.filter(Q(category_id=1) & Q(user_clothes__id=id)).values('img_url', 'cloth_type').distinct()
    outers = Cloth.objects.filter(Q(category_id=2) & Q(user_clothes__id=id)).values('img_url', 'cloth_type').distinct()
    pants = Cloth.objects.filter(Q(category_id=4) & Q(user_clothes__id=id)).values('img_url', 'cloth_type').distinct()
    skirts = Cloth.objects.filter(Q(category_id=3) & Q(user_clothes__id=id)).values('img_url', 'cloth_type').distinct()
    onepieces = Cloth.objects.filter(Q(category_id=5) & Q(user_clothes__id=id)).values('img_url', 'cloth_type').distinct()

    context={
        'tops':tops,
        'outers':outers,
        'bottoms':pants,
        'skirts':skirts,
        'onepieces':onepieces
    }
    return render(request, 'codi/myCloset.html',context)

@login_required
def addCloth(request):
    id = request.user.id
    topN = Cloth.objects.filter(~Q(user_clothes__id=id)).values('img_url', 'cloth_type').distinct()
    context={
        'tops':topN
    }
    return render(request, 'codi/addCloth1.html', context)

@login_required    
def getClothList(request):
    category_id = request.POST["category_id"]
    if int(category_id) == 99:
        # print(category_id)
        # print(category_id)
        id = request.user.id
        topN = Cloth.objects.filter(~Q(user_clothes__id=id)).values('img_url', 'cloth_type').distinct()
    else:
        # print(category_id)
        id = request.user.id # user 저장된 고유 id 번호
        topN = Cloth.objects.filter(Q(category_id=category_id) & ~Q(user_clothes__id=id)).values('img_url', 'cloth_type').distinct()

    context = {
        "tops": topN
    }
    return render(request, 'codi/cloth_card.html', context)


@login_required
def add(request):
    img_url = request.POST["img_url"] # 선택한 옷의 url
    # print(img_url)
    pid = Cloth.objects.filter(img_url=img_url) # 선택한 옷 url이랑 이미지 같은 옷들 다 가져오기.

    # 사용자의 옷장 DB에 옷을 추가한다!
    if request.user in pid[0].user_clothes.all():
        for tmp in pid:
            tmp.user_clothes.remove(request.user)
    else:
        for tmp in pid:
            # print(type(tmp))
            tmp.user_clothes.add(request.user)
#           print(pid.user_clothes.all())
    context = {

    }
    return HttpResponse(json.dumps(context), status=200, content_type='application/json')

def mapToGrid(lat, lon, code = 0 ):
    Re = 6371.00877     ##  지도반경
    grid = 5.0          ##  격자간격 (km)
    slat1 = 30.0        ##  표준위도 1
    slat2 = 60.0        ##  표준위도 2
    olon = 126.0        ##  기준점 경도
    olat = 38.0         ##  기준점 위도
    xo = 210 / grid     ##  기준점 X좌표
    yo = 675 / grid     ##  기준점 Y좌표
    first = 0
    if first == 0 :
        PI = math.asin(1.0) * 2.0
        DEGRAD = PI/ 180.0
        re = Re / grid
        slat1 = slat1 * DEGRAD
        slat2 = slat2 * DEGRAD
        olon = olon * DEGRAD
        olat = olat * DEGRAD
        sn = math.tan(PI * 0.25 + slat2 * 0.5) / math.tan(PI * 0.25 + slat1 * 0.5)
        sn = math.log(math.cos(slat1) / math.cos(slat2)) / math.log(sn)
        sf = math.tan(PI * 0.25 + slat1 * 0.5)
        sf = math.pow(sf, sn) * math.cos(slat1) / sn
        ro = math.tan(PI * 0.25 + olat * 0.5)
        ro = re * sf / math.pow(ro, sn)
        first = 1
    ra = math.tan(PI * 0.25 + lat * DEGRAD * 0.5)
    ra = re * sf / pow(ra, sn)
    theta = lon * DEGRAD - olon
    if theta > PI :
        theta -= 2.0 * PI
    if theta < -PI :
        theta += 2.0 * PI
    theta *= sn
    x = (ra * math.sin(theta)) + xo
    y = (ro - ra * math.cos(theta)) + yo
    x = int(x + 1.5)
    y = int(y + 1.5)
    return x, y
    
def getWeather(request):
    lng = request.POST["lng"]
    lat= request.POST["lat"]
    x = (mapToGrid(float(lat),float(lng))[0])
    y = (mapToGrid(float(lat),float(lng))[1])
    min_tmp = get_tmn_data(x,y)
    max_tmp = get_tmx_data(x,y)
    # print("*******************")
    # print(ForecastTimeData(x,y))
    now_tmp = ForecastTimeData(x,y)[0]
    nowDate = ForecastTimeData(x,y)[1]
    nowMonth = nowDate[4:6]
    # print("$$$$$$$$$$$$$$"+nowMonth)
    context = {
        'min': min_tmp,
        'max': max_tmp,
        'now': now_tmp,
        'nowDate': nowDate,
        'nowMonth': nowMonth
    }
    return HttpResponse(json.dumps(context), content_type="application/json")
