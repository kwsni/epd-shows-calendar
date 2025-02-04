# Fetch and serve api data from Sonarr and Tautulli
import os, io, datetime, requests
from dotenv import load_dotenv
from flask import Flask, request, send_file

load_dotenv()

def dtToday():
    return datetime.datetime.today().replace(hour=0, minute=0, second=0, microsecond=0)
def dtWeek():
    return dtToday + datetime.timedelta(days=7)

app = Flask(__name__)

@app.route('/api/sonarrCal', methods=['GET'])
def get_sonarr_cal():
    if request.method == 'GET':
        data = requests.get(f'{os.getenv("VITE_SONARR_URL")}/api/v3/calendar?start={dtToday().isoformat()}&end={dtWeek().isoformat()}&includeSeries=true&apikey={os.getenv("VITE_SONARR_API_KEY")}')
        return data.content, data.status_code


@app.route('/api/tautulliWatched', methods=['GET'])
def get_tautulli_watched():
    if request.method == 'GET':
        data = requests.get(f'{os.getenv("VITE_TAUTULLI_URL")}/api/v2/?apikey={os.getenv("VITE_TAUTULLI_API_KEY")}&cmd=get_history&section_id=2&after={dtToday().isoformat()}')
        return data.content, data.status_code
        
@app.route('/api/posters/<seriesId>', methods=['GET'])
def get_poster(seriesId):
    if request.method == 'GET':
        data = requests.get(f'{os.getenv("VITE_SONARR_URL")}/api/v3/mediacover/{seriesId}/poster.jpg?apikey={os.getenv("VITE_SONARR_API_KEY")}')
        return send_file(io.BytesIO(data.content), mimetype='image/jpeg'), data.status_code