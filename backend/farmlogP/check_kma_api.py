import requests
from datetime import datetime
import xml.etree.ElementTree as ET

def get_weather_data():
    api_key = "ngkZ8kaX45nchLkmR0fY/LsGI6oTiYiNbMjcxNoEFESkYXjQ7Df4Fvn+qbMBPM3aO51zqo8fwFA2pP30IzjZrw=="
    url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"

    # 현재 시간 기준으로 base_date와 base_time 설정
    now = datetime.now()
    base_date = now.strftime('%Y%m%d')
    base_time = '0800'  # 예시로 오전 8시를 사용 (필요에 따라 조정 가능)

    params = {
        'serviceKey': api_key,
        'pageNo': '1',
        'numOfRows': '10',
        'dataType': 'XML',
        'base_date': base_date,
        'base_time': base_time,
        'nx': '60',  # 연천군의 X 좌표
        'ny': '129',  # 연천군의 Y 좌표
    }

    response = requests.get(url, params=params)

    # 응답 내용 출력
    print("Response status code:", response.status_code)
    print("Response text:", response.text)

    if response.status_code == 200:
        try:
            root = ET.fromstring(response.text)
            items = root.findall('.//item')
            max_temp = None
            min_temp = None
            for item in items:
                category = item.find('category').text
                fcstValue = item.find('fcstValue').text
                if category == 'TMX':  # 최고기온
                    max_temp = fcstValue
                if category == 'TMN':  # 최저기온
                    min_temp = fcstValue
            return max_temp, min_temp
        except ET.ParseError as e:
            print("XML parse error: ", e)
            return None, None
    else:
        print(f"Error: {response.status_code}")
        return None, None

if __name__ == "__main__":
    max_temp, min_temp = get_weather_data()
    print(f"Max Temp: {max_temp}, Min Temp: {min_temp}")