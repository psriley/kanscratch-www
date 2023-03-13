from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser


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


class Instructor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


"""
Describes the Class object that is used to identify a class or classes that a user is part of.
"""
class Class(models.Model):
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    class_code_hash = models.CharField(max_length=250)
    active = models.BooleanField(default=True)
    created_on = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, related_name='class_created_user', on_delete=models.CASCADE)
    updated_on = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey(User, related_name='class_updated_user', on_delete=models.CASCADE)


"""
Describes the Class and Student relationship/bridge table. This is used to identify a specific Student
object in a class.
"""
class ClassStudents(models.Model):
    # class is a python specific name, so vars()['class'] enables the field to be called class (https://stackoverflow.com/questions/47630356/using-the-reserved-word-class-as-field-name-in-django-and-django-rest-framewor).
    vars()['class'] = models.OneToOneField(Class, on_delete=models.CASCADE)
    student = models.OneToOneField(User, on_delete=models.CASCADE)


"""
Describes a Project object. This is used by teachers to assign projects to students in a class.
"""
# TODO: Change this model so that Project objects are associated to classes and projects can be
# copied over from other classes.
class Project(models.Model):
    # class is a python specific name, so vars()['class'] enables the field to be called class (https://stackoverflow.com/questions/47630356/using-the-reserved-word-class-as-field-name-in-django-and-django-rest-framewor).
    vars()['class'] = models.OneToOneField(Class, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    due_date = models.DateTimeField(blank=True, null=True)
    available_date = models.DateTimeField(blank=True, null=True)
    created_on = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, related_name='project_created_user', on_delete=models.CASCADE)
    updated_on = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey(User, related_name='project_updated_user', on_delete=models.CASCADE)

    # two of the same projects can be in multiple classes, but two of the same projects can't be in the same class
    class Meta:
        unique_together = (('id', 'class'), ('name', 'class'))


"""
Describes the submission of a Project object. This is used by students, but teachers should be able to view the submission.
"""
class ProjectSubmission(models.Model):
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)
    # class is a python specific name, so vars()['class'] enables the field to be called class (https://stackoverflow.com/questions/47630356/using-the-reserved-word-class-as-field-name-in-django-and-django-rest-framewor).
    vars()['class'] = models.ForeignKey(Class, on_delete=models.SET_NULL, null=True)
    student = models.ForeignKey(ClassStudents, on_delete=models.SET_NULL, null=True)
    created_on = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, related_name='submission_created_user', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('project', 'student', 'class')
