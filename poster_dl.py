from dotenv import load_dotenv
from requests import get
import os
from datetime import datetime, timezone

load_dotenv()

url = os.getenv('SONARR_URL')
apikey = os.getenv('API_KEY')
path = os.path.dirname(os.path.realpath(__file__))
posterUrl=""

data = get(f'{url}/api/v3/calendar?includeSeries=true&apikey={apikey}').json()
nextEvent = next(filter(lambda event: datetime.fromisoformat(event['airDateUtc'][:19]).replace(tzinfo=timezone.utc) > datetime.now(timezone.utc), data))
for media in nextEvent['series']['images']:
    if media['coverType'] == 'poster':
        posterUrl = media['remoteUrl']

poster = get(posterUrl).content
f = open(os.path.join(path, 'src/assets/poster.jpg'), 'wb')

f.write(poster)
f.close()