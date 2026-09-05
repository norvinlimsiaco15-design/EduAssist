"""Authentication routes."""

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

from controllers.auth_controller import login_user, register_student
from models.user import find_by_id, user_to_dict

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/api/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}
    user, error = register_student(
        data.get("full_name", ""),
        data.get("email", ""),
        data.get("password", ""),
    )
    if error:
        return jsonify({"error": error}), 400

    token = create_access_token(
        identity=str(user["id"]),
        additional_claims={"role": user["role"]},
    )
    return jsonify({"token": token, "user": user}), 201


@auth_bp.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    user, error = login_user(data.get("email", ""), data.get("password", ""))
    if error:
        return jsonify({"error": error}), 401

    token = create_access_token(
        identity=str(user["id"]),
        additional_claims={"role": user["role"]},
    )
    return jsonify({"token": token, "user": user}), 200


@auth_bp.route("/api/me", methods=["GET"])
@jwt_required()
def me():
    user_id = int(get_jwt_identity())
    user = find_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"user": user_to_dict(user)}), 200
