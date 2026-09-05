"""User model and database queries."""

import bcrypt
from database.connection import get_connection


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def check_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))


def find_by_email(email: str):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT id, full_name, email, password, role FROM users WHERE email = %s",
                (email.lower().strip(),),
            )
            return cursor.fetchone()
    finally:
        conn.close()


def find_by_id(user_id: int):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT id, full_name, email, role, created_at FROM users WHERE id = %s",
                (user_id,),
            )
            return cursor.fetchone()
    finally:
        conn.close()


def create_user(full_name: str, email: str, password: str, role: str = "student"):
    hashed = hash_password(password)
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO users (full_name, email, password, role)
                VALUES (%s, %s, %s, %s)
                """,
                (full_name.strip(), email.lower().strip(), hashed, role),
            )
            user_id = cursor.lastrowid
        conn.commit()
        return find_by_id(user_id)
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def user_to_dict(user):
    if not user:
        return None
    return {
        "id": user["id"],
        "full_name": user["full_name"],
        "email": user["email"],
        "role": user["role"],
    }
