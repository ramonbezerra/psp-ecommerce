from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from api.routes import api_blueprint
from auth.routes import auth_blueprint

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Set a strong secret key

jwt = JWTManager(app)  # Initialize JWTManager with your app

CORS(app)

app.register_blueprint(api_blueprint, url_prefix='/api')
app.register_blueprint(auth_blueprint, url_prefix='/auth')

if __name__ == "__main__":
    app.run(debug=True)