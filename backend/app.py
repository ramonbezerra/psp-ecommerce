from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

from models import db

from api.routes import api_blueprint
from auth.routes import auth_blueprint

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Set a strong secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  # Use your database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable track modifications to save resources

jwt = JWTManager(app)  # Initialize JWTManager with your app

db.init_app(app)  # Initialize SQLAlchemy with your app

CORS(app)

app.register_blueprint(api_blueprint, url_prefix='/api')
app.register_blueprint(auth_blueprint, url_prefix='/auth')

with app.app_context():
    db.create_all()  # Create database tables if they don't exist

if __name__ == "__main__":
    app.run(debug=True)