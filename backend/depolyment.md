
# Mahvie
A Django powered Angular web app to simplify the insurance buying experience

## Update Server - Backend
Django | Angular | Gunicorn | Nginx

Code deployment is similar to setup the project in local expect the Ngnix and Gunicorn.
Ngnix and Gunicorn is installed and configured in the server. [Reference - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-18-04)

### Run bash script for update server with latest changes from the main branch.
```console
g2gadmin@vlappdv01:~$ ./update_server.sh
```
### If new packages are added the to requirement files then update the server with
```console
g2gadmin@vlappdv01:~$ ./update_server_packages.sh.sh
```

## Update Server - Frontend
### Run the build commnad for production build. Take build in local and transfer the folder to server. There are two ways
1. FTP
2. SCP command
### Using SCP command
To take build refer this https://angular.io/guide/deployment

Excute the below command from the build location
```console
scp -r mahvie g2gadmin@52.138.9.181:/var/www/angular_build/               
```
### Restart Nginx server
```console
g2gadmin@vlappdv01:~$ sudo systemctl restart nginx
```
## Update Database on the PaaS
Updating the database is handled by running the migrations in the django.
```console
g2gadmin@vlappdv01:~/mahvie/backend/mahvie$ python manage.py migrate
```

## Ngnix Config Files
Backend - /etc/nginx/sites-available/mahvie_api
Frontend - /etc/nginx/sites-available/mahvie

   


