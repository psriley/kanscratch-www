import math
from random import random

from django.contrib.auth.hashers import make_password
from model_bakery.recipe import Recipe, foreign_key
from model_bakery import baker
from projects.models import User, Student, Instructor, Color, Classroom

"""
These recipes are used in tests so that when you create an object, you don't have to fill in every single field every time.
"""


def get_hashed_password():
    return make_password("password")


user = Recipe(
    "projects.User",
    username="test_user",
    email="email@email.com",
    password=get_hashed_password,
    first_name="Test",
    last_name="User",
)

instructor = Recipe(
    "projects.Instructor",
    user=foreign_key(user),
)

color = Recipe(
    "projects.Color",
    name="KSU Purple",
    slug="ksu_purple",
    hex_code="#512888",
)

classroom = Recipe(
    "projects.Classroom",
    slug="classroom",
    name="classroom",
    description="description",
    instructor=foreign_key(instructor),
    class_code_hash="code",
    color_id=foreign_key(color),
    active=True,
)

project = Recipe(
    "projects.Project",
    classroom=foreign_key(classroom),
    slug="project",
    name="project",
    description="description",
)

class_students = Recipe(
    "projects.ClassStudents",
    classroom=foreign_key(classroom),
    student=foreign_key(user),
)

project_submission = Recipe(
    "projects.ProjectSubmission",
    project=foreign_key(project),
    classroom=foreign_key(classroom),
    student=foreign_key(class_students),
)


def get_random_color():
    characters = 'ABCDEF0123456789'
    hex = '#'
    for j in range(0, 6):
        hex += characters[(math.floor(random() * len(characters)))]

    color = baker.make(Color, hex_code=hex)

    return color


def create_user(
    username: str = "test_user",
    email: str = "email@email.com",
    type: str = User.Type.STUDENT,
    name: str = "Test User",
    password: str = get_hashed_password,
    **kwargs,
):
    """
    Creates a user and an associated 'Instructor' or 'Student' object.
    """
    first_name, last_name = name.rsplit(" ", 1)
    kwargs = {
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password,
        "type": type,
        **kwargs,
    }
    user_instance = baker.make(User, **kwargs)
    user_instance.updated_by = user_instance
    if type == User.Type.STUDENT:
        baker.make(Student, user=user_instance)
    else:
        baker.make(Instructor, user=user_instance)

    return user_instance


def create_classroom(
    name: str = "classroom",
    description: str = "description",
    class_code_hash: str = "code",
    **kwargs
):
    kwargs = {
        "name": name,
        "description": description,
        "class_code_hash": class_code_hash,
        **kwargs,
    }
    color = get_random_color()
    classroom_instance = baker.make(Classroom, color=color, created_by=kwargs["instructor"].user, updated_by=kwargs["instructor"].user, **kwargs)
    return classroom_instance
