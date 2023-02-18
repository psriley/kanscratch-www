from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser


"""
Describes the School object that is used to identify the User's school.
"""
class School(models.Model):
    name = models.CharField(max_length=200)
    nces_id = models.PositiveBigIntegerField()
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey('User', on_delete=models.CASCADE, default=None, blank=True, null=True)


"""
Describes the User object that is used to identify a user.
"""
class User(AbstractUser):
    name = models.CharField(max_length=200)
    user_type = models.CharField(max_length=50)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE)
    active = models.BooleanField(default=False)
    password_hash = models.CharField(verbose_name='password', max_length=250)
    salt = models.CharField(max_length=250)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey('User', on_delete=models.CASCADE, default=None, blank=True, null=True)


"""
Describes the Class object that is used to identify a class or classes that a user is part of.
"""
class Class(models.Model):
    name = models.CharField(max_length=200)
    passphrase_hash = models.CharField(max_length=250)
    salt = models.CharField(max_length=250)
    active = models.BooleanField()
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey('User', related_name='class_user', on_delete=models.CASCADE)


"""
Describes the Class and User relationship/bridge table. This is used to identify a specific User
object in a class.
"""
class ClassUsers(models.Model):
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)


"""
Describes a Project object. This is used by teachers to assign projects to students in a class.
"""
# TODO: Change this model so that Project objects are associated to classes and projects can be
# copied over from other classes.
class Project(models.Model):
    user = models.ForeignKey(User, related_name="project_user", on_delete=models.CASCADE)
    teacher = models.ForeignKey(User, related_name="teacher", on_delete=models.CASCADE)
    user_type = models.CharField(max_length=50)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey('User', on_delete=models.CASCADE)
