import requests

url = 'https://kauth.kakao.com/oauth/token'
rest_api_key = '378c15ff44a91970906607d2d645bb53'
redirect_uri = 'https://example.com/oauth'
authorize_code = 'WFrV92dlfZkEzoHPpP0DGz3O9BchjSaSBumuqOHFcNmxi1wVIdLNswAAAAQKPXPrAAABk5kZJlkSmUam6ZdnFg'

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
with open(r"D:\\SDHS\\24WebApp\\flask\\token\\code.json","w") as fp:
    json.dump(tokens, fp)