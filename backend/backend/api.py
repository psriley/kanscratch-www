from ninja import NinjaAPI
from ninja import Schema
from django.utils import timezone
from datetime import datetime
from typing import List
from projects.models import User
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password


"""Schema used to validate user's username and password on login."""
class Login(Schema):
    username: str = None
    password: str = None


"""Schema that is used to create a new user in the database."""
class UserIn(Schema):
    username: str = None
    name: str = None
    user_type: str
    school_id_id: int = None
    active: bool = True
    password_hash: str = None
    password: str = None
    salt: str = None
    created_on: datetime = None
    updated_on: datetime = None
    updated_by_id: int = None


"""Schema that is used to retrieve a list of users in the database"""
class UsersOut(Schema):
    id: int
    username: str
    name: str
    user_type: str
    school_id_id: int = None
    active: bool = True
    password_hash: str = None
    password: str
    salt: str = None
    created_on: datetime = None
    updated_on: datetime = None
    updated_by_id: int = None


# api object used in urls.py.
api = NinjaAPI()


"""Retrieves a list of all users."""
@api.get("/users", response=List[UsersOut])
def list_users(request):
    qs = User.objects.all()
    return qs


"""Creates a user object."""
@api.post("/users")
def create_user(request, payload: UserIn):
    user = User.objects.create_user(**payload.dict())
    return {"id": user.id}


"""Validates a user trying to login to make sure they are in the database."""
@api.post("/login")
def user_login(request, payload: Login):
    response = validate_user(payload)
    return response


"""
Provides a User object and checks their password is correct, otherwise
returns an appropriate error message.
"""
def validate_user(payload):
    try:
        user = get_object_or_404(User, username=payload.username)
    except Exception:
        return f"No user with the username: {payload.username}"

    resp = check_password(payload.password, user.password)
    if resp:
        return "Successful!"
    else:
        return "Wrong password!"


# @api.put("/users/{user_id}")
# def update_user(request, user_id: int):
#     user = get_object_or_404(User, id=user_id)
#     for attr, value in payload.dict().items():
#         setattr(user, attr, value)
#     user.save()
#     return {"success": True}
