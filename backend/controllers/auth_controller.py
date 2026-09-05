"""Authentication business logic."""

import re
from models.user import check_password, create_user, find_by_email, user_to_dict


EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def validate_email(email: str):
    if not email or not EMAIL_PATTERN.match(email.strip()):
        return False, "Invalid email address"
    return True, None


def validate_password(password: str):
    if not password or len(password) < 6:
        return False, "Password must be at least 6 characters"
    return True, None


def register_student(full_name: str, email: str, password: str):
    if not full_name or len(full_name.strip()) < 2:
        return None, "Full name is required"

    ok, msg = validate_email(email)
    if not ok:
        return None, msg

    ok, msg = validate_password(password)
    if not ok:
        return None, msg

    if find_by_email(email):
        return None, "Email is already registered"

    try:
        user = create_user(full_name, email, password, role="student")
        return user_to_dict(user), None
    except Exception as e:
        if "Duplicate" in str(e):
            return None, "Email is already registered"
        return None, "Registration failed. Please try again."


def login_user(email: str, password: str):
    if not email or not password:
        return None, "Email and password are required"

    user = find_by_email(email)
    if not user or not check_password(password, user["password"]):
        return None, "Invalid email or password"

    return user_to_dict(user), None
