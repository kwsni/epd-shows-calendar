from dotenv import load_dotenv
from requests import get
import os

load_dotenv()

url = os.getenv('SONARR_URL')
apikey = os.getenv('API_KEY')
posterUrl=""

data = get(url + f'/api/v3/calendar?includeSeries=true&apikey={apikey}').json()
for media in data[0]['series']['images']:
    if media['coverType'] == 'poster':
        posterUrl = media['remoteUrl']

poster = get(posterUrl).content
f = open('src/assets/poster.jpg', 'wb')

f.write(poster)
f.close()