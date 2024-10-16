#!/usr/bin/python3
# -*- coding:utf-8 -*-
# Fetch api data from Sonarr and Tautulli
import os, datetime, requests, json
from dotenv import load_dotenv

load_dotenv()

basedir = os.path.dirname(os.path.realpath(__file__))
picdir = os.path.join(basedir, 'public/posters')

dtToday = datetime.datetime.today().replace(hour=0, minute=0, second=0, microsecond=0)
dtWeek = dtToday + datetime.timedelta(days=7)

response = requests.get(f'{os.getenv("VITE_SONARR_URL")}/api/v3/calendar?start={dtToday.isoformat()}&end={dtWeek.isoformat()}&includeSeries=true&apikey={os.getenv("VITE_SONARR_API_KEY")}')

if response.status_code == 200:
    with open(os.path.join(basedir, 'sonarr-cal.json'), 'w') as of:
        json.dump(response.json(), of, indent=4)

    if len(response.json()) > 0:
        for episode in response.json():
          for media in episode['series']['images']:
            if media['coverType'] == 'poster':
                f = open(os.path.join(picdir, f'{episode["series"]["titleSlug"]}.jpg'), 'wb')
                f.write(requests.get(media['remoteUrl']).content)
                f.close()

response = requests.get(f'{os.getenv("VITE_TAUTULLI_URL")}/api/v2/?apikey={os.getenv("VITE_TAUTULLI_API_KEY")}&cmd=get_history&section_id=2&after={dtToday.isoformat()}')

if response.status_code == 200:
    with open(os.path.join(basedir, 'tautulli-watched.json'), 'w') as of:
        json.dump(response.json(), of, indent=4)