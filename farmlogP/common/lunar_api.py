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
api_url = "http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/getLunCalInfo"

def get_lunar_date(sol_year, sol_month, sol_day):
    try:
        params = {
            'ServiceKey': SERVICE_KEY,
            'solYear': sol_year,
            'solMonth': f"{sol_month:02d}",
            'solDay': f"{sol_day:02d}",
        }

        response = requests.get(api_url, params=params)
        response.raise_for_status()

        # API 응답 내용 출력
        print("Response content:", response.content.decode('utf-8'))

        # XML 응답 파싱
        root = ET.fromstring(response.content)
        items = root.findall('.//item')

        if not items:
            print("Item not found in XML response.")
            return None

        item = items[0]
        lunar_year = item.find('lunYear').text
        lunar_month = item.find('lunMonth').text
        lunar_day = item.find('lunDay').text

        return {
            'lunar_year': lunar_year,
            'lunar_month': lunar_month,
            'lunar_day': lunar_day
        }

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

if __name__ == "__main__":
    # 테스트용 날짜
    sol_year = 2024
    sol_month = 7
    sol_day = 25

    lunar_date = get_lunar_date(sol_year, sol_month, sol_day)
    print(lunar_date)