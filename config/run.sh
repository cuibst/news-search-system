python manage.py migrate
gunicorn 'NewsSearchSystem.wsgi' -b 0.0.0.0:8001 --access-logfile - --log-level info
cd frontend
npm run serve -- --port 80