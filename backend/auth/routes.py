from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

auth_blueprint = Blueprint('auth', __name__)

# fake user database
USERS = {
    "alice": {
        "password": "password123",
        "role": "admin"
    },
    "bob": {
        "password": "mypassword",
        "role": "user"
    }
}

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    print(username, password)

    user = USERS.get(username)

    if user and user['password'] == password:
        access_token = create_access_token(identity=username)
        refresh_token = create_refresh_token(identity=username)
        return jsonify(access_token=access_token, refresh_token=refresh_token), 200
    else:
        return jsonify(message="Invalid username or password"), 401 

