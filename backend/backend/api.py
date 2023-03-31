import json

from django.forms import model_to_dict
from ninja import NinjaAPI
from ninja import Schema
from datetime import datetime
from typing import List
from projects.models import User, Classroom, Project, Student, ClassStudents, ProjectSubmission
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password

#region Schemas

"""Schema used to validate user's username and password on login."""
class Login(Schema):
    username: str = None
    password_hash: str = None


"""Schema that is used to create a new user in the database."""
class UserIn(Schema):
    username: str = None
    type: str = 'Instructor'
    is_superuser: bool = False
    is_active: bool = True
    password_hash: str = None
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


"""List of instructor ids"""
class InstructorOut(Schema):
    id: int


"""List of student ids and user objects"""
class StudentOut(Schema):
    id: int
    user: UsersOut


"""Schema that is used to create a new class in the database."""
class ClassroomIn(Schema):
    name: str = "Class 1"
    class_code_hash: str = None
    instructor: InstructorOut
    active: bool = True
    created_on: datetime = None
    updated_on: datetime = None
    created_by_id: int = 1
    updated_by_id: int = 1


"""Schema that is used to retrieve a list of classes in the database"""
class ClassroomOut(Schema):
    name: str = "Class 1"
    class_code_hash: str = None
    instructor: InstructorOut
    active: bool = True
    created_on: datetime = None
    updated_on: datetime = None
    created_by_id: int = 1
    updated_by_id: int = 1


"""Schema that is used to retrieve a list of projects in the database"""
class ProjectOut(Schema):
    name: str = "Project 1"
    description: str = "project description",
    classroom_id: int = 1,
    created_by_id: int = 1,
    updated_by_id: int = 1


"""Schema that represents the ClassStudents relationship entity"""
class ClassStudentsOut(Schema):
    classroom_name: str
    student: StudentOut


"""Schema that is used to retrieve details for a specific project"""
# TODO: Due date and Available date implementation
class DetailedProjectOut(Schema):
    name: str = "Project 1",
    description: str = "project description",
    classroom_id: int = 1,
    #due_date: datetime = None,
    #available_date: datetime = None,
    created_by_id: int = 1,
    updated_by_id: int = 1


"""Schema that is used to retrieve a project submission for a particular student"""
class ProjectSubmissionOut(Schema):
    classroom: ClassroomOut
    project: DetailedProjectOut


# endregion

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
def create_class(request, payload: ClassroomIn):
    c = Classroom.objects.create_class(**payload.dict())
    return {"id": c.id}


"""Retrieves a list of all classes for a specific user."""
@api.get("/user_classes", response=List[ClassroomOut])
def list_user_classes(request, username):
    if not username:
        return

    user = User.objects.filter(student__user__username=username).first()
    if not user:
        user = User.objects.get(instructor__user__username=username)
        return Classroom.objects.filter(instructor__user=user)

    return Classroom.objects.filter(classstudents__student=user)


@api.get("/classes", response=List[ClassroomOut])
def list_classes(request):
    return Classroom.objects.all()


"""Retrieves a list of all projects."""
@api.get("/projects", response=List[ProjectOut])
def list_projects(request):
    qs = Project.objects.all()
    return qs


"""Retrieves a list of all students in a class."""
@api.get("/students/{class_id}", response=List[StudentOut])
def list_students(request, class_id: int):
    qs = Student.objects.filter(user__classstudents__class_id=class_id)
    return qs

# TODO: Does this need to also work for an instructor?
"""Retrieves a list of projects for a particular student""" 
@api.get("/student_projects/{username}", response=List[ProjectOut])
def list_student_projects(request, username: str):
    if not username:
        return
    user = User.objects.filter(username=username).first()
    if not user:
        return
    return Project.objects.filter(projectsubmission__student__student=user)


"""Retrieves a list of projects for a particular instructor"""
@api.get("/instructor_projects/{username}", response=List[ProjectOut])
def list_instructor_projects(request, username: str):
    if not username:
        return
    user = User.objects.filter(username=username).first()
    if not user:
        return
    return Project.objects.filter(classroom__instructor__user=user)

'''
# TODO: How can we query for a particular project?
"""Retrieves project details for a particular project""" 
@api.get("/projects/details/{project_submission_id}", response=ProjectSubmissionOut)
def get_project_details(request, project_submission_id: int):
    if not project_submission_id:
        return
    project_submission = ProjectSubmission.objects.filter(id=project_submission_id)
    return project_submission
    '''

"""Retrieves details for a specific project"""
@api.get("/projects/{project_id}/{username}/{classroom_id}", response=ProjectSubmissionOut)
def get_project_details(request, project_id: int, username: str, classroom_id: int):
    if project_id and username and classroom_id:
        if not username:
            return
        user = User.objects.filter(username=username).first()
        print(user)
        if not user:
            return
        project_submission = ProjectSubmission.objects.get(project_id=project_id, 
                                                                 student__student = user,
                                                                 classroom_id=classroom_id)
        print(project_submission)
        #return project_submission
        return {"classroom": project_submission.classroom, "project": project_submission.project}
    else:
        return

"""Creates a ClassStudents object."""
@api.post("/join")
def join_class(request, payload: ClassStudentsOut):
    classroom_id = Classroom.objects.filter(name=payload.classroom_name).first().id
    user = User.objects.filter(username=payload.student).first()
    cs = ClassStudents.objects.create(classroom_id=classroom_id, student=user)
    return {"id": cs.id}


"""
Provides a User object and checks their password is correct, otherwise
returns an appropriate error message.
"""
def validate_user(payload):
    try:
        user = get_object_or_404(User, username=payload.username)
    except Exception:
        return f"No user with the username: {payload.username}"

    resp = check_password(payload.password_hash, user.password_hash)
    if resp:
        return {"message": "Successful!", "user": model_to_dict(user)}
    else:
        return "Wrong password!"


# @api.put("/users/{user_id}")
# def update_user(request, user_id: int):
#     user = get_object_or_404(User, id=user_id)
#     for attr, value in payload.dict().items():
#         setattr(user, attr, value)
#     user.save()
#     return {"success": True}
