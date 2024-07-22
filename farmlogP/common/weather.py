import os
import requests
import xml.etree.ElementTree as ET
from dotenv import load_dotenv

# 환경 변수 로드 (루트 디렉토리에서)
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path)

# API 키 가져오기
SERVICE_KEY = os.environ.get("SERVICE_KEY")

# API URL
api_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"

params = {
    'serviceKey': SERVICE_KEY,
    'numOfRows': '1000',
    'dataType': 'XML',  # XML 형식으로 변경
    'base_time': '0500',
    'nx': '60',
    'ny': '137',
}

def fetch_data_from_kma(current_time_kst, category, fcst_time):
    try:
        date_format = "YYYYMMDD"
        base_date = current_time_kst.format(date_format)
        params['base_date'] = base_date
        params['pageNo'] = 1

        response = requests.get(api_url, params=params)
        response.raise_for_status()
        
        # XML 응답 파싱
        root = ET.fromstring(response.content)
        items = root.findall(".//item")

        found = None
        for item in items:
            if item.find('category').text == category and item.find('fcstTime').text == fcst_time:
                found = item.find('fcstValue').text
                break

        return found

    except requests.exceptions.HTTPError as errh:
        print(f"HTTP Error: {errh}")
    except requests.exceptions.ConnectionError as errc:
        print(f"Error Connecting: {errc}")
    except requests.exceptions.Timeout as errt:
        print(f"Timeout Error: {errt}")
    except requests.exceptions.RequestException as err:
        print(f"Something went wrong: {err}")
    except ET.ParseError as e:
        print(f"XML Parse Error: {e}")

    return None