# # pull official base image
# FROM python:3.8-alpine

# # set work directory
# WORKDIR /app/backend

# # set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# # install dependencies
# RUN pip install --upgrade pip
# COPY ./requirements.txt .
# RUN pip3 install -r requirements.txt

# # copy project
# COPY . .

FROM python:3.8-alpine

WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

# # Build psycopg2-binary from source -- add required required dependencies
# RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev && \
#         pip install --no-cache-dir -r requirements.txt && \
#         apk --purge del .build-deps

COPY . /app/backend/

# # copy entrypoint.sh
# COPY entrypoint.sh .
# RUN sed -i 's/\r$//g' /app/backend/entrypoint.sh
# RUN chmod +x /app/backend/entrypoint.sh

# # copy project
# COPY . .

# # run entrypoint.sh
# ENTRYPOINT ["/app/backend/entrypoint.sh"]

CMD ["/bin/sh", "startup.sh"]
# CMD [ "python", "manage.py", "migrate",
#         "python", "manage.py", "runserver", "0.0.0.0:8000" ]