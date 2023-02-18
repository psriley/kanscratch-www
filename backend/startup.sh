#/bin/sh
echo "Starting running migrations"
python manage.py migrate
echo "Collecting static files"
python manage.py collectstatic --noinput
echo "Starting runserver"
python manage.py runserver 0.0.0.0:8000
