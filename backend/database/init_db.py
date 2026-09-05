"""
Initialize the EduAssist database.

Usage:
    python database/init_db.py

Requires MySQL to be running and .env configured.
"""

import os
import sys

import bcrypt
import pymysql
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", 3306)),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "charset": "utf8mb4",
}


def run_schema():
    """Execute schema.sql to create database and tables."""
    schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
    with open(schema_path, "r", encoding="utf-8") as f:
        schema_sql = f.read()

    conn = pymysql.connect(**DB_CONFIG)
    try:
        with conn.cursor() as cursor:
            for statement in schema_sql.split(";"):
                statement = statement.strip()
                if statement and not statement.startswith("--"):
                    try:
                        cursor.execute(statement)
                    except pymysql.Error as e:
                        if "Duplicate" not in str(e):
                            print(f"Warning: {e}")
        conn.commit()
        print("Schema applied successfully.")
    finally:
        conn.close()


def seed_admin():
    """Create default admin user with bcrypt-hashed password."""
    password = "admin123"
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    conn = pymysql.connect(**DB_CONFIG, database=os.getenv("DB_NAME", "eduassist"))
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO users (full_name, email, password, role)
                VALUES (%s, %s, %s, 'admin')
                ON DUPLICATE KEY UPDATE password = VALUES(password)
                """,
                ("Education Consultant", "admin@eduassist.com", hashed),
            )
        conn.commit()
        print("Admin user seeded: admin@eduassist.com / admin123")
    finally:
        conn.close()


if __name__ == "__main__":
    print("Initializing EduAssist database...")
    try:
        run_schema()
        seed_admin()
        print("Database initialization complete.")
    except pymysql.Error as e:
        print(f"Error: {e}")
        sys.exit(1)
