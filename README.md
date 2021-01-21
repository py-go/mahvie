![Mahvie Logo](mahvie-logo.png)</br>
[![GNU Affero General Public Licensed](https://img.shields.io/badge/license-GNU%20AGPLv3-blue.svg)](./LICENSE.md)

# Mahvie
A Django powered Angular web app to simplify the insurance buying experience

# About

Mahvie is primarily authored by Pratiman Shahi and guided and supported by the Mahvie [Product Team](mailto:pratiman.shahi@mahvie.com)

Mahvie is maintained and funded by Mahvie Inc. The names and logos for Mahvie are trademarks of Mahvie Inc.

# Getting Started
### Install Python
#### Linux
Most UNIX systems come with a python3 interpreter pre-installed.
#### Windows
[Python Setup on Windows](https://docs.python.org/3/using/windows.html)

### Install Pip
```console
developer@ubuntu:~$ sudo apt install -y python3-pip
```
### Setting Up a Virtual Environment
```console
developer@ubuntu:~$ sudo apt install -y python3-venv
```
### Create and Activate env
```console
developer@ubuntu:~$ python3 -m venv mahvie_env
developer@ubuntu:~$ source mahvie_env/bin/activate
```
### Install packages
Once the mahvie_env is actiavted we can install the packages
```console
(mahvie_env) developer@ubuntu:~$ pip install -r requirements.txt
```
### Install MySQL and Python, MySQL development headers and libraries
```console
developer@ubuntu:~$ sudo apt install mysql-server
developer@ubuntu:~$ sudo apt install python3-dev
developer@ubuntu:~$ sudo apt install python3-dev libmysqlclient-dev default-libmysqlclient-dev
```
### Create the Database and New user
```console
developer@ubuntu:~$ sudo mysql -u root
mysql> CREATE DATABASE mahvie;
mysql> CREATE USER 'mahvie_user'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
mysql> GRANT ALL ON mahvie.* TO 'mahvie_user'@'%';
mysql> FLUSH PRIVILEGES;
```
### Connecting to the database
[Connect to database from django](https://docs.djangoproject.com/en/3.1/ref/databases#connecting-to-the-database)
>Note: Create .env file in root dir same as .env_example file add the necessary details

### Run the development server
```console
developer@ubuntu:~$mahive/mahvie python manage.py migrate
developer@ubuntu:~$mahive/mahvie python manage.py runserver
```
 
# Demo Credentials
## Client Emails:

## Agent Emails:

## Password:

    
<a name="license"></a>
# License
[GNU Affero General Public Licence (GNU AGPLv3)](LICENSE)
