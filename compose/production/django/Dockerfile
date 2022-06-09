# syntax=docker/dockerfile:1
FROM node:16
RUN apt-get update || : && apt-get install python3 -y
RUN apt-get install python3-pip -y

WORKDIR /code/backend
RUN mkdir /export/
#RUN mkdir -p /code/backend/algocount/media
COPY ./backend/requirements.txt .
RUN pip3 install -r requirements.txt
RUN pip3 install -q gunicorn

WORKDIR /code/frontend
COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
RUN npm install -g nx@13.3.1
RUN npm ci --force
COPY ./frontend .
RUN npx nx build cms --prod

WORKDIR /code
COPY ./compose/production/django/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/production/django/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

COPY ./backend /code/backend/

ENTRYPOINT ["/entrypoint"]
