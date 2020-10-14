# 동네예보에서 아침최저기온(TMN)과 낮최고기온(TMX)
# TMN 0200, TMX 1100 update
# 0210, 1110 이후 당일 정보 가능

import json
from datetime import datetime
from urllib.request import urlopen

def get_tmn_data(x, y):
    now = datetime.now()
    now_date = now.strftime('%Y%m%d')
    now_hour = int(now.strftime('%H'))
    now_min = int(now.strftime('%M'))
    service_key = 'lgkNpxB8TTbXXj4%2BEK9KumE72Q78STsTzIR9MEgjrEARC7OGjiX4cS8UTFTxT55PqDvk1ARfSgMATErdYQKb9A%3D%3D'
    _type = 'json'
    nx = x
    ny = y
    if now_hour < 2:
        base_date = str(int(now_date) - 1)
    elif now_hour==2 & now_min<10:
        base_date = str(int(now_date) - 1)
    else:
        base_date = now_date
    base_date = base_date
    base_time = '0200'
    api_url = f'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?serviceKey={service_key}&base_date={base_date}&base_time={base_time}&nx={nx}&ny={ny}&_type={_type}'
    data = urlopen(api_url).read()
    json_data = json.loads(data)
    weather_info = json_data['response']['body']['items']['item']
    # print(weather_info)
    num = int(len(weather_info))
    for i in range(num):
        if weather_info[i]['category'] == 'TMN':
            tmn = weather_info[i]['fcstValue']
    return tmn
def get_tmx_data(x, y):
    now = datetime.now()
    now_date = now.strftime('%Y%m%d')
    now_hour = int(now.strftime('%H'))
    now_min = int(now.strftime('%M'))
    service_key = 'lgkNpxB8TTbXXj4%2BEK9KumE72Q78STsTzIR9MEgjrEARC7OGjiX4cS8UTFTxT55PqDvk1ARfSgMATErdYQKb9A%3D%3D'
    _type = 'json'
    if now_hour < 11:
        base_date = str(int(now_date) - 1)
    elif now_hour==11 & now_min<10:
        base_date = str(int(now_date) - 1)
    else:
        base_date = now_date
    nx = x
    ny = y
    base_date = base_date
    base_time = '1100'
    api_url = f'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?serviceKey={service_key}&base_date={base_date}&base_time={base_time}&nx={nx}&ny={ny}&_type={_type}'
    data = urlopen(api_url).read()
    json_data = json.loads(data)
    weather_info = json_data['response']['body']['items']['item']
    # print(weather_info)
    num = int(len(weather_info))
    for i in range(num):
        if weather_info[i]['category'] == 'TMX':
            tmx = weather_info[i]['fcstValue']
    return tmx
    