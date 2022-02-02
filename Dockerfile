FROM node:16
RUN apt-get update || : && apt-get install python3 -y
RUN apt-get install python3-pip -y
WORKDIR /app
RUN  mkdir /LOG/
RUN mkdir /export/


COPY backend/requirements.txt /app
RUN pip3 install -r requirements.txt
RUN pip3 install -q gunicorn

COPY . /app
RUN mkdir -p /app/backend/algocount/media
WORKDIR /app/frontend
RUN npm ci
WORKDIR /app/backend/algocount/


