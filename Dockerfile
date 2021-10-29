FROM nikolaik/python-nodejs:python3.8-nodejs14
USER pn
WORKDIR /home/pn/app
RUN  mkdir /home/pn/LOG/
RUN mkdir /home/pn/export/


COPY backend/requirements.txt /home/pn/app
RUN pip install -r requirements.txt
COPY . /home/pn/app



