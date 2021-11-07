from django.contrib import admin
from .models import Users,Files,Classes


# Register your models here.

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('name', 'sex', 'idcard', 'created_time','password','avatar','identity','last_logged_in','logged_in')

@admin.register(Files)
class FilesAdmin(admin.ModelAdmin):
    list_display = ('file','owner','uploaded_time','subject','description','publish','publish_list')

@admin.register(Classes)
class ClassesAdmin(admin.ModelAdmin):
    list_display = ('name','owner','created_time','subject','member')
