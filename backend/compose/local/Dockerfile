# syntax=docker/dockerfile:1
FROM node:16
RUN apt-get update || : && apt-get install python3 -y
RUN apt-get install python3-pip -y
WORKDIR /code/backend

RUN mkdir /export/
COPY ./backend/requirements.txt .
RUN pip3 install -r requirements.txt

COPY ./frontend /code/frontend
RUN mkdir -p /code/backend/algocount/media

WORKDIR /code
COPY ./backend/compose/local/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./backend/compose/local/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

COPY ./backend /code/
ENTRYPOINT ["/entrypoint"]
