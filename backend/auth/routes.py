from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
import bcrypt

auth_blueprint = Blueprint('auth', __name__)

# fake user database
USERS = {
    "alice": {
        "password": bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()),
        "role": "admin"
    },
    "bob": {
        "password": "mypassword",
        "role": "user"
    }
}

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'user')

    if username in USERS:
        return jsonify(message="User already exists"), 409
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    USERS[username] = {
        "password": hashed_password,
        "role": role
    }

    return jsonify(message="User registered successfully"), 201

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = USERS.get(username)

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        access_token = create_access_token(identity=username, additional_claims={"role": user['role']})
        refresh_token = create_refresh_token(identity=username, additional_claims={"role": user['role']})
        return jsonify(access_token=access_token, refresh_token=refresh_token), 200
    else:
        return jsonify(message="Invalid username or password"), 401 

