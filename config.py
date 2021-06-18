"""Flask config."""
from os import environ, path
from dotenv import load_dotenv
from datetime import timedelta
# from pymongo import MongoClient

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

class Development:
	# Set Flask config variables.

	FLASK_ENV = 'development'
	TESTING = True
	SECRET_KEY = environ.get('SECRET_KEY')
	TEMPLATES_AUTO_RELOAD = True
	STATIC_FOLDER = 'static'
	TEMPLATES_FOLDER = 'templates'
	# SERVER_NAME = 'http://127.0.0.1:5000/'
	SESSION_COOKIE_HTTPONLY = True
	SESSION_COOKIE_SECURE = True
	SESSION_COOKIE_SAMESITE = "Lax"
	# CSRF_COOKIE_HTTPONLY = True
	MONGO_URI = environ.get('MONGO_URI')
	PERMANENT_SESSION_LIFETIME = timedelta(days=3)
	# Directories
	# __file__ dunder is path of this module up to parent directory
	# ROOT = path.dirname(__file__) + '/'
	UPLOAD = 'csv/'


class Production:
	# """Set Flask config variables."""

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

	# Directories
	# __file__ dunder is path of this module up to parent directory
	# ROOT = path.dirname(__file__) + '/'
	UPLOAD = 'csv/'