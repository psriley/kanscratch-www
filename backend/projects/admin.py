from django.contrib import admin

from .models import User, Class, Student, Instructor

# Register your models here.
admin.site.register(User)
admin.site.register(Class)
admin.site.register(Student)
admin.site.register(Instructor)
