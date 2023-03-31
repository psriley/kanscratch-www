from django.contrib.auth.models import UserManager
from django.db.models import QuerySet



class UManager(UserManager):
    def create_user(self, username, email=None, password_hash=None, user_type='Instructor', **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        temp_user = super().create_user(username, email=email, password=password_hash, **extra_fields)

        from projects.models import User

        #This is needed to change the password field into password_hash field so the password can be hashed automatically by django
        user = User.objects.get(username=temp_user.username)
        user.password_hash = temp_user.password
        user.save()

        from projects.models import Instructor, Student

        if user_type == 'Instructor':
            instructor = Instructor(user=user)
            instructor.save()
        elif user_type == 'Student':
            student = Student(user=user)
            student.save()
        else:
            raise ValueError(f"{user_type} is an improper user type. Must be either Instructor or Student")

        return user



class ClassroomManager(QuerySet):
    def create_class(self, active, instructor, name="Class 1", **extra_fields):
        c = self.model(instructor=instructor.pk, name=name, active=active, **extra_fields)
        c.save(using=self._db)
        return c


class ProjectSubmissionManager(QuerySet):
    pass