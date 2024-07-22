import os
import requests
import arrow
from dotenv import load_dotenv

# 환경 변수 로드 (루트 디렉토리에서)
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path)

# API 키 가져오기
SERVICE_KEY = os.environ.get("SERVICE_KEY")

# API URL
api_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"

# 요청 파라미터 설정 (관측 위치: 서울특별시 강남구 개포2동)
params = {
    'serviceKey': SERVICE_KEY,
    'numOfRows': '1000',
    'dataType': 'JSON',
    'base_time': '0500',
    'nx': '55',
    'ny': '127',
}

def fetch_data_from_kma(current_time_kst, category, fcst_time):
    try:
        date_format = "YYYYMMDD"
        base_date = current_time_kst.format(date_format)
        params['base_date'] = base_date
        params['pageNo'] = 1

        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()

        items = data['response']['body']['items']['item']
        found = next((x for x in items if x['category'] == category and x['fcstTime'] == fcst_time), None)

        if found:
            return found['fcstValue']
        else:
            return None

    except requests.exceptions.HTTPError as errh:
        print(f"HTTP Error: {errh}")
    except requests.exceptions.ConnectionError as errc:
        print(f"Error Connecting: {errc}")
    except requests.exceptions.Timeout as errt:
        print(f"Timeout Error: {errt}")
    except requests.exceptions.RequestException as err:
        print(f"Something went wrong: {err}")

    return None