"""EduAssist Backend - Student Study-Abroad Assistance System."""

from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config.settings import Config
from routes.auth import auth_bp
from routes.health import health_bp


def create_app():
    """Application factory."""
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = Config.JWT_ACCESS_TOKEN_EXPIRES
    app.config["DEBUG"] = Config.DEBUG

    CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])
    JWTManager(app)

    app.register_blueprint(health_bp)
    app.register_blueprint(auth_bp)

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"error": "Internal server error"}), 500

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=Config.DEBUG)
