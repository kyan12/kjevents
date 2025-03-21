"""
Main App
"""

import os
import logging
import smtplib
from sendgrid import SendGridAPIClient
from logging.handlers import TimedRotatingFileHandler
from flask import Flask, request, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bootstrap import Bootstrap
from config import Config
from flask_user.signals import user_sent_invitation, user_registered


db = SQLAlchemy()
migrate = Migrate()
bootstrap = Bootstrap()
sg = None

def init_sendgrid(app):
    """Initialize SendGrid client with app config"""
    global sg
    try:
        sg = SendGridAPIClient(app.config['SENDGRID_API_KEY'])
        app.logger.info('SendGrid initialized successfully')
    except Exception as e:
        app.logger.error(f'SendGrid initialization failed: {str(e)}')
        sg = None


def create_app(config_class=Config):
    app = Flask(__name__, subdomain_matching=True)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    init_sendgrid(app)

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)


    if not app.debug and not app.testing:
        if not os.path.exists(app.config['LOG_DIR']):
            os.mkdir(app.config['LOG_DIR'])
        file_handler = TimedRotatingFileHandler(app.config['LOG_DIR'] + '/kjevents.log', when='midnight', backupCount=30)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        app.logger.setLevel(logging.INFO)
        app.logger.debug('kjevents startup')
    return app
