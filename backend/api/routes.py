from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/hello', methods=['GET'])
@jwt_required()
def hello():
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify(message='Unauthorized'), 401
    name = current_user if current_user != None else 'Guest'
    return jsonify(message=f'Hello, {name}!')