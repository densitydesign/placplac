# syntax=docker/dockerfile:1
FROM node:16
RUN apt-get update || : && apt-get install python3 -y
RUN apt-get install python3-pip -y
WORKDIR /code/backend

RUN mkdir /export/
COPY ./backend/requirements.txt .
RUN pip3 install -r requirements.txt

COPY ./frontend/package.json /code/frontend/package.json
COPY ./frontend/package-lock.json /code/frontend/package-lock.json
WORKDIR /code/frontend
RUN npm install -g nx
RUN npm ci
COPY ./frontend /code/frontend

RUN mkdir -p /code/backend/algocount/media
WORKDIR /code
COPY ./compose/production/django/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/local/django/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

COPY ./backend /code/
ENTRYPOINT ["/entrypoint"]
