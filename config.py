"""
Config file for app
"""
import os
import sys
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    USER_APP_NAME = "FANTOM"
    USER_ENABLE_USERNAME = False
    USER_ENABLE_EMAIL = True
    USER_REQUIRE_INVITATION = True
    USER_ENABLE_INVITE_USER = True
    CSRF_ENABLED = True
    SERVER_NAME = os.environ.get('SERVER_NAME') or 'fantom-nyc.com'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    MAX_CONTENT_LENGTH = 64 * 1024 * 1024
    ROOT_DIRECTORY = os.path.dirname(__file__)

    LOG_DIR = os.path.join(ROOT_DIRECTORY, 'logs')