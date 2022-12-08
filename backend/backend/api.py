from ninja import NinjaAPI
from ninja import Schema
from django.utils import timezone
from datetime import datetime
from typing import List
from projects.models import User
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import get_object_or_404

class UserIn(Schema):
    name: str
    user_type: str
    school_id_id: int = None
    active: bool = True
    password_hash: str = None
    salt: str = None
    created_on: datetime = None
    updated_on: datetime = None
    updated_by_id: int = None

class UsersOut(Schema):
    id: int
    name: str
    user_type: str
    school_id_id: int = None
    active: bool = True
    password_hash: str = None
    salt: str = None
    created_on: datetime = None
    updated_on: datetime = None
    updated_by_id: int = None


api = NinjaAPI()

@api.get("/hello")
def hello(request, name="user"):
    return f"Hello {name}"

@api.get("/users", response=List[UsersOut])
def list_users(request):
    qs = User.objects.all()
    return qs

@api.post("/users")
def create_user(request, payload: UserIn):
    user = User.objects.create(**payload.dict())
    return {"id": user.id}

# @api.put("/users/{user_id}")
# def update_user(request, user_id: int):
#     user = get_object_or_404(User, id=user_id)
#     for attr, value in payload.dict().items():
#         setattr(user, attr, value)
#     user.save()
#     return {"success": True}
