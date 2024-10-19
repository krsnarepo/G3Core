# G3Core Project

This repository contains a backend app writen with Django, django rest framework and jwt tokens.
The frontend app is developed with the framework Angular v18.
The goal of the project was to build a full stack web app for a courier business, consisting of three modules (orders, packages and delivery)

## Installation

Clone the repository:

```bash
git clone https://github.com/krsnarepo/G3Core.git
```
## Windows Instructions

Install dependencies via venv
```bash
py -m venv env
env/Scripts/activate
pip install -r requirements.txt
```
Set up database
```bash
py manage.py makemigrations
py manage.py migrate
```
Create superuser
```bash
py manage.py createsuperuser
```
Run the server
```bash
python manage.py runserver
```

Install angular dependencies
```bash
npm install
```

Finally run the front app server
```bash
ng serve
```

## Contributing
Contributions are welcome. Please fork the repository and submit pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
