import requests
import json

def send_kakao_message(message):
    # 1. 토큰 로드
    with open(r"C:\\Users\\jyn13\\OneDrive\\바탕 화면\\2024WebApp\\2024WebApp\\flask\\token\\code.json", "r") as fp:
        tokens = json.load(fp)

    url = "https://kapi.kakao.com/v2/api/talk/memo/default/send"

    # Authorization 헤더 설정
    headers = {
        "Authorization": "Bearer " + tokens["access_token"],
        "Content-Type": "application/x-www-form-urlencoded"
    }

    # 메시지 데이터 설정
    data = {
        "template_object": json.dumps({
            "object_type": "text",
            "text": message,
            "link": {
                "web_url": "https://www.naver.com"
            }
        })
    }

    # POST 요청 보내기
    response = requests.post(url, headers=headers, data=data)

    # 응답 상태 코드 확인
    print(response.status_code)
    if response.status_code == 200:
        response_data = response.json()
        if response_data.get('result_code') == 0:
            print('메시지를 성공적으로 보냈습니다.')
        else:
            print(f"메시지 전송 실패: {response_data}")
    else:
        print(f"HTTP 요청 실패. 상태 코드: {response.status_code}. 응답 내용: {response.text}")