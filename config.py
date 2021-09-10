"""Flask config."""
from os import environ, path
from dotenv import load_dotenv
from datetime import timedelta

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

class Development:

	FLASK_ENV = 'development'
	TESTING = True
	SECRET_KEY = environ.get('SECRET_KEY')
	TEMPLATES_AUTO_RELOAD = True
	STATIC_FOLDER = 'static'
	TEMPLATES_FOLDER = 'templates'
	SESSION_COOKIE_HTTPONLY = True
	SESSION_COOKIE_SECURE = True
	SESSION_COOKIE_SAMESITE = "Lax"
	# CSRF_COOKIE_HTTPONLY = True
	MONGO_URI = environ.get('MONGO_URI')
	PERMANENT_SESSION_LIFETIME = timedelta(days=3)
	UPLOAD = 'csv/'


class Production:

	FLASK_ENV = 'production'
	TESTING = False
	SECRET_KEY = environ.get('SECRET_KEY')
	TEMPLATES_AUTO_RELOAD = True
	STATIC_FOLDER = 'static'
	TEMPLATES_FOLDER = 'templates'
	SESSION_COOKIE_HTTPONLY = True
	SESSION_COOKIE_SECURE = True
	SESSION_COOKIE_SAMESITE = "Lax"
	MONGO_URI = environ.get('MONGO_URI')
	PERMANENT_SESSION_LIFETIME = timedelta(days=3)
	DB_USER = environ.get('DB_USER')
	DB_PASSWORD = environ.get('DB_PASSWORD')
	UPLOAD = 'csv/'