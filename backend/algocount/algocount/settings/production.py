from .base import *

DEBUG = False
STATIC_ROOT = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    'static_root')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
    }
}

LOGGING_CONFIG = None

logging.config.dictConfig({
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'verbose': {
            'format': "[%(asctime)s] %(levelname)s [%(module)s:%(name)s:%(lineno)s] %(message)s",
            'datefmt': "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'file': {
            'level': 'WARNING',
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': LOG_PATH + 'supersonica.log',
            'when': 'D', # this specifies the interval
            'interval': 1, # defaults to 1, only necessary for other values
            'backupCount': 10, # how many backup file to keep, 10 days
            'formatter': 'verbose',
        },

    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'WARNING'),
        }
    },
})


LOGGER = logging.getLogger('django')
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'