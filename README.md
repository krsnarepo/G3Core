# Backend Core Project

This repository contains a backend core writen with django and a front app developed with angular.

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
