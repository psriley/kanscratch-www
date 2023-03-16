from ninja import NinjaAPI
from ninja import Schema
from django.utils import timezone
from datetime import datetime
from typing import List
from projects.models import User, Class, Instructor
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
    type: str = 'Instructor'
    is_superuser: bool = False
    is_active: bool = True
    password: str = None
    created_on: datetime = None
    updated_on: datetime = None
    updated_by_id: int = None


"""Schema that is used to retrieve a list of users in the database."""
class UsersOut(Schema):
    id: int
    username: str = None
    type: str = 'Instructor'
    is_superuser: bool = False
    is_active: bool = True
    password_hash: str = None
    created_on: datetime = None
    updated_on: datetime = None
    updated_by_id: int = None


class InstructorOut(Schema):
    id: int


"""Schema that is used to create a new class in the database."""
class ClassIn(Schema):
    name: str = "Class 1"
    class_code_hash: str = None
    instructor: InstructorOut
    active: bool = True
    created_on: datetime = None
    updated_on: datetime = None
    created_by_id: int = 1
    updated_by_id: int = 1


"""Schema that is used to retrieve a list of classes in the database"""
class ClassOut(Schema):
    name: str = "Class 1"
    class_code_hash: str = None
    instructor: InstructorOut
    active: bool = True
    created_on: datetime = None
    updated_on: datetime = None
    created_by_id: int = 1
    updated_by_id: int = 1


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


# def list_instructors(request)


"""Creates a class object."""
@api.post("/class")
def create_class(request, payload: ClassIn):
    c = Class.objects.create_class(**payload.dict())
    return {"id": c.id}


"""Retrieves a list of all users."""
@api.get("/classes", response=List[ClassOut])
def list_classes(request):
    qs = Class.objects.all()
    return qs


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
