# Developing in KanScratch:
- The backend and frontend stacks of the project are separated into a directory with the corresponding name in the root of the project.

# Backend
- The backend of KanScratch is basically just an API that is structured with Django (https://www.djangoproject.com/) and Django ninja (https://django-ninja.rest-framework.com/).
- The API is a RESTful FastAPI.

# Frontend
- The API on the backend is called on the frontend using the JavaScript library "React" (https://reactjs.org/) on the frontend through axios (https://axios-http.com/docs/intro) calls.

# Database
- This project uses PostgreSQL.
- To view the tables and data in the database download a PostgreSQL client
    + We use DBeaver (use `sudo snap install dbeaver-ce` found in https://dbeaver.io/download/ to download DBeaver for Linux with "snap")

# Docker
- This project is packaged into docker containers. One for the PostgreSQL database (`db`), one for the backend Django site (`web`), and one for the frontend (`frontend`).
- Developer environment vs. production environment:
    + The developer environment is run with `docker-compose up`, and uses the `docker-compose.yaml` file when building
    + The production environment is run with ``

# Deployment
- The backend is deployed with Gunicorn and Nginx, and the frontend is deployed with Nginx.
    + Look in `nginx` directory and `docker-compose.prod.yaml` for deployment code and information.

# Testing
- Frontend testing is done with Jest (https://jestjs.io/). Tests can be run (after directing to the frontend container with `cd frontend` in your terminal) with `npm run test`.

# Useful files
- The navigation bar can be found in `frontend/src/components/topbar.js`.
- "index.js" (`frontend/src/index.js`) contains all of the routers with links across the site.
- "manage.py" (`backend/manage.py`) can be used to `makemigrations` and `migrate` to the database in the terminal (after directing to the backend directory with `cd backend`) with `docker-compose run web manage.py makemigrations` OR `docker-compose run web manage.py migrate`.
    + Migrations would need to be made after making changes to the `models.py`, or if you want to change the structure or properties of anything in the database.