from django.db import IntegrityError

from backend import api
from django.test import TestCase
from projects.models import User, ProjectSubmission, Classroom, ClassStudents, Project, Instructor
from django.utils import timezone
from model_bakery import baker
from backend import baker_recipes as recipes

"""
Testing POST API calls:
- Create "data" dictionary that includes all the necessary input for the api call
- Create schema object labeled "payload" containing previously created "data" input 
(Schema objects are located at the top of api.py).
- Pass schema object into api call as payload
- Make assertions about response
"""


class PostTestCase(TestCase):
    def setUp(self):
        password = recipes.get_hashed_password()
        self.user = recipes.create_user(username="user1", password_hash=password)

    def test_login(self):
        # test existing username, but wrong password
        data = {
            "username": "user1",
            "password_hash": "incorrect password"
        }
        payload = api.Login(**data)
        resp = api.user_login(self, payload)
        assert resp == "Wrong password!"
        # TODO: Write jest test that ensures localStorage doesn't contain incorrect login values

        # test non-existing username, and correct password
        data = {
            "username": "incorrect username",
            "password_hash": "password"
        }
        payload = api.Login(**data)
        resp = api.user_login(self, payload)
        assert resp == f"No user with the username: {data['username']}"

        # test non-existing username, and wrong password
        data = {
            "username": "incorrect username",
            "password_hash": "pass"
        }
        payload = api.Login(**data)
        resp = api.user_login(self, payload)
        assert resp == f"No user with the username: {data['username']}"

        # test existing username, and correct password (successful login)
        data = {
            "username": "user1",
            "password_hash": "password"
        }
        payload = api.Login(**data)
        resp = api.user_login(self, payload)
        assert resp["message"] == "Successful!"
        assert resp["user"]["username"] == User.objects.get(username=data["username"]).username

    def test_create_user(self):
        # test missing username
        assert User.objects.count() == 1 # user from setUp exists before this test
        data = {
            "type": User.Type.INSTRUCTOR,
            "created_on": timezone.now(),
            "updated_on": timezone.now(),
        }
        payload = api.UserIn(**data)
        with self.assertRaises(ValueError) as context:
            api.create_user(self, payload)

        assert "The given username must be set" in str(context.exception)

        # test correct input
        assert User.objects.count() == 1
        data = {
            "username": "test_user",
            "type": User.Type.INSTRUCTOR,
            "created_on": timezone.now(),
            "updated_on": timezone.now(),
        }
        payload = api.UserIn(**data)
        api.create_user(self, payload)
        assert User.objects.count() == 2
        created_user = User.objects.get(username=data["username"])
        assert created_user.username == data["username"]
        assert created_user.type == data["type"]

        # test duplicate user
        assert User.objects.count() == 2
        data = {
            "username": "test_user",
            "type": User.Type.STUDENT,
            "created_on": timezone.now(),
            "updated_on": timezone.now(),
        }
        payload = api.UserIn(**data)
        with self.assertRaises(IntegrityError) as context:
            api.create_user(self, payload)

        assert f"{data['username']} already exists!" in str(context.exception)


class GetTestCase(TestCase):
    def setUp(self):
        password = recipes.get_hashed_password()
        self.user1 = recipes.create_user(username="user1", password_hash=password)
        self.user2 = recipes.create_user(username="user2", password_hash=password)
        self.user3 = recipes.create_user(username="user3", type=User.Type.INSTRUCTOR, password_hash=password)

        self.classroom = recipes.create_classroom(slug="classroom", name="classroom", instructor=Instructor.objects.get(user=self.user3))
        self.other_classroom = recipes.create_classroom(slug="other_classroom", name="other_classroom", class_code_hash="sOxusE", instructor=Instructor.objects.get(user=self.user3))

        project = baker.make(Project, classroom=self.classroom, created_by=self.user3, updated_by=self.user3)
        project2 = baker.make(Project, classroom=self.other_classroom, created_by=self.user3, updated_by=self.user3)
        user1_cs = baker.make(ClassStudents, classroom=self.classroom, student=self.user1)

        user2_cs = baker.make(ClassStudents, classroom=self.classroom, student=self.user2)

        baker.make(ProjectSubmission, project=project, student=user1_cs, created_by=self.user1)
        baker.make(ProjectSubmission, project=project, student=user2_cs, created_by=self.user2)
        baker.make(ProjectSubmission, project=project2, student=user2_cs, created_by=self.user2)

    def test_list_users(self):
        assert len(api.list_users(self)) == 3

    def test_list_users_content(self):
        assert api.list_users(self).first() == User.objects.first()

    def test_list_user_classes_length(self):
        user = self.user1.username
        assert len(api.list_user_classes(self, user)) == 1

    def test_list_classes_length(self):
        assert len(api.list_classes(self)) == 2

    def test_list_projects_length(self):
        assert len(api.list_projects(self)) == 2

    def test_list_class_students_length(self):
        classroom_id = 1
        assert len(api.list_students(self, classroom_id)) == 2

    def test_list_student_projects_length(self):
        user = "user1"
        assert len(api.list_student_projects(self, user)) == 1

        user = "user2"
        assert len(api.list_student_projects(self, user)) == 2

        # this is a bit of a weird assertion, but instructors shouldn't have student projects
        user = "user3"
        assert len(api.list_student_projects(self, user)) == 0

    def test_list_instructor_projects(self):
        user = "user3"
        assert len(api.list_instructor_projects(self, user)) == 2
