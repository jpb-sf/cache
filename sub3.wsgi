activate_this = '/var/www/Sub3/cacheVenv/bin/activate_this.py'
with open(activate_this) as file_:
        exec(file_.read(), dict(__file__=activate_this))

import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/Sub3")

from Sub3 import app as application
application.debug = True
application.secret_key = 'Add your secret key'
