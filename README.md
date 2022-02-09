# Deployment guide

To run the project you need to have installed docker and docker-compose.
Steps:

- download the project
- create the file /backend/algocount/.backend.env (see the /backend/algocount/.backend.env.example file) using the following indications:

  - ADMIN_EMAIL : the email of the admin account you want to create for the platform
  - ADMIN_PASSWORD: the password of the admin account
  - EMAIL_HOST: The host to use for sending email
  - EMAIL_PORT: Port to use for the SMTP server
  - EMAIL_HOST_USER: Username to use for the SMTP server
  - EMAIL_HOST_PASSWORD: Password to use for the SMTP server defined
  - EMAIL_USE_TLS: Whether to use a TLS (secure) connection when talking to the SMTP server
  - EMAIL_USE_SSL: Whether to use an implicit TLS (secure) connection when talking to the SMTP server. In most email documentation this type of TLS connection is referred to as SSL. It is generally used on port 465. If you are experiencing problems, set the explicit TLS setting EMAIL_USE_TLS.
  - PLATFORM_NAME: the platform name that will be included in the emails

- create the file /.env (see the /.env.example file) using the following indications:

  - MEDIA_FOLDER: the folder where the media files will be saved
  - DB_FOLDER: the folder where the db will save all the data
  - PORT_OUT: the host port on which to run the project

- open the shell in the main folder of the project
- run the following commands:
  ```
  sudo docker compose up --build --detach
  ```
  or for older versions of docker-compose
  ```
  sudo docker-compose up --build --detach

  ```

When the build finishes the project will be reachable at the PORT_OUT of the host

## Update
To update the application pull the update from github then from the project folder rebuild the docker container using the following command:

```
sudo docker compose up --build --detach
```
or for older versions of docker-compose 

```
sudo docker-compose up --build --detach
```
# Development guide

The project is structured this way:

- backend
- frontend : The app is built as a monorepo using nx

  - apps

    - cms : is the "back-office" application made with reactjs using react-admin library. Using the cms the user can publish his research and download the static files of the created research.
    - export-site: is the application neeeded to generate the export of the research. This app is made using nextjs.

  - libs

    - shared

      - styles : in here are stored the css files which are shared between cms app and export-site app
      - types : in here are store the typescript definition files

    - ui-site: These are the visualization components of the site used both in the preview of the csm and in the export-site project. They are also used in forms for creating block content.

To start editing the app we need to setup the dev workspace

## Backend workspace setup
Create the file /backend/algocount/.backend.env (see the /backend/algocount/.backend.env.example file).
First of all open the shell in the /backend folder.
Than use the following command to run the backend app:
```
sudo docker compose up --build
```
This command will run a django server on the port 8000 and will save the db data to the folder "data" outside the project root.
Now your backend is up and ready to accept connections

## Frontend workspace setup
Open the shell in the /frontend folder and run the following commands:
First of all install nx globally:
```
npm install -g nx
```

```
npm ci
```
These commands will install all the dependecies needed to run the project.
Then we need to serve the main app using the following command:
```
nx serve cms
```
Now you can start editing the files.

# Requirements
## Minumum requirements:
- RAM: 4GB 
- CPU: dual core  1.2 GHz
- HDD: 30GB plus extra space for media storage

## Recommended requirements
- RAM: 16GB 
- CPU: quad core 2.0 GHz
- SSD: 50 GB for system
- HDD: for media storage