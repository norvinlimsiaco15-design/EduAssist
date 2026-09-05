"""Health check routes."""

from flask import Blueprint, jsonify
from database.connection import test_connection

health_bp = Blueprint("health", __name__)


@health_bp.route("/api/health", methods=["GET"])
def health_check():
    """Return API and database health status."""
    db_ok, db_message = test_connection()
    return jsonify({
        "status": "ok" if db_ok else "degraded",
        "message": "EduAssist API is running",
        "database": {
            "connected": db_ok,
            "message": db_message,
        },
    }), 200 if db_ok else 503
