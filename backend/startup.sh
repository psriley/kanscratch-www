#/bin/sh
echo "Starting running migrations"
python manage.py migrate
echo "Starting runserver"
python manage.py runserver 0.0.0.0:8000