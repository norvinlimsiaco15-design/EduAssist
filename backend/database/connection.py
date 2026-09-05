"""Database connection utilities for MySQL."""

import pymysql
from pymysql.cursors import DictCursor
from config.settings import Config


def get_connection():
    """Create and return a new MySQL connection."""
    return pymysql.connect(
        host=Config.DB_HOST,
        port=Config.DB_PORT,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME,
        cursorclass=DictCursor,
        autocommit=False,
    )


def test_connection():
    """Test database connectivity. Returns (success, message)."""
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT 1 AS ok")
            result = cursor.fetchone()
        conn.close()
        if result and result.get("ok") == 1:
            return True, "Database connection successful"
        return False, "Unexpected response from database"
    except pymysql.Error as e:
        return False, f"Database connection failed: {e}"
