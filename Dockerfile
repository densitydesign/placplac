FROM nikolaik/python-nodejs:python3.8-nodejs14
ENV PATH="$PATH:/home/pn/.local/bin/"
RUN mkdir -p /var/log/gunicorn
RUN chown pn /var/log/gunicorn
USER pn
WORKDIR /home/pn/app
RUN  mkdir /home/pn/LOG/
RUN mkdir /home/pn/export/
COPY backend/requirements.txt /home/pn/app
RUN pip install -r requirements.txt
RUN pip install -q gunicorn
COPY --chown=pn:pn . /home/pn/app
WORKDIR /home/pn/app/frontend/export_site
RUN  npm install --silent
WORKDIR /home/pn/app/backend/algocount/

# CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]


