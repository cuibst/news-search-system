python manage.py migrate
gunicorn 'NewsSearchSystem.wsgi' -b 0.0.0.0:80 --access-logfile - --log-level info