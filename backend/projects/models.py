from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

from projects.managers import ProjectSubmissionManager, ClassroomManager, UManager

"""
Describes the User object that is used to identify a user.
"""
class User(AbstractUser):

    class Type(models.TextChoices):
        INSTRUCTOR = 'Instructor'
        STUDENT = 'Student'

    type = models.CharField(max_length=10, choices=Type.choices, default=Type.STUDENT)
    password_hash = models.CharField(verbose_name='password', max_length=250)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey('self', on_delete=models.CASCADE, default=None, blank=True, null=True)

    objects = UManager()


class Instructor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Color(models.Model):
    name = models.CharField(max_length=500)
    slug = models.CharField(max_length=255, unique=True)
    hex_code = models.CharField(max_length=7)


"""
Describes the Classroom object that is used to identify a classroom or classrooms that a user is part of.
"""
class Classroom(models.Model):
    slug = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    class_code_hash = models.CharField(max_length=7, unique=True)
    color = models.ForeignKey(Color, on_delete=models.CASCADE, blank=True)
    active = models.BooleanField(default=True)
    created_on = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, related_name='class_created_user', on_delete=models.CASCADE)
    updated_on = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey(User, related_name='class_updated_user', on_delete=models.CASCADE)

    objects = ClassroomManager()

    class Meta:
        unique_together = ('instructor', 'color')


"""
Describes the Classroom and Student relationship/bridge table. This is used to identify a specific Student
object in a classroom.
"""
class ClassStudents(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.RESTRICT)
    student = models.ForeignKey(User, on_delete=models.RESTRICT)
    active = models.BooleanField(default=True)


"""
Describes a Project object. This is used by teachers to assign projects to students in a class.
"""
# TODO: Change this model so that Project objects are associated to classes and projects can be
# copied over from other classes.
class Project(models.Model):
    classroom = models.OneToOneField(Classroom, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=32)
    slug = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    due_date = models.DateTimeField(blank=True, null=True)
    available_date = models.DateTimeField(blank=True, null=True)
    created_on = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, related_name='project_created_user', on_delete=models.CASCADE)
    updated_on = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey(User, related_name='project_updated_user', on_delete=models.CASCADE)

    # two of the same projects can be in multiple classes, but two of the same projects can't be in the same class
    class Meta:
        unique_together = (('id', 'classroom'), ('name', 'classroom'))


"""
Describes the submission of a Project object. This is used by students, but teachers should be able to view the submission.
"""
class ProjectSubmission(models.Model):
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)
    classroom = models.ForeignKey(Classroom, on_delete=models.SET_NULL, null=True)
    student = models.ForeignKey(ClassStudents, on_delete=models.SET_NULL, null=True)
    created_on = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, related_name='submission_created_user', on_delete=models.CASCADE)
    
    objects = ProjectSubmissionManager()

    class Meta:
        unique_together = ('project', 'student', 'classroom')
