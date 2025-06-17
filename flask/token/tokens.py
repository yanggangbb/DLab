import requests

url = 'https://kauth.kakao.com/oauth/token'
rest_api_key = '378c15ff44a91970906607d2d645bb53'
redirect_uri = 'https://example.com/oauth'
authorize_code = 'BQvMwiHQBQQIMTmzL42XZPb4pqeAND0KErPChQV7CTtLv3IVRV01ywAAAAQKKiVTAAABk5qJDj_o6jj-qNQmaA'

data = {
    'grant_type':'authorization_code',
    'client_id':rest_api_key,
    'redirect_uri':redirect_uri,
    'code': authorize_code,
    }

response = requests.post(url, data=data)
tokens = response.json()
print(tokens)

# json 저장
import json
#1.
with open(r"C:\\Users\\jyn13\\OneDrive\\바탕 화면\\2024WebApp\\2024WebApp\\flask\\token\\code.json","w") as fp:
    json.dump(tokens, fp)