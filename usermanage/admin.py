from django.contrib import admin
from .models import Users,Files


# Register your models here.

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('name', 'sex', 'idcard', 'created_time','password','avatar')

@admin.register(Files)
class FilesAdmin(admin.ModelAdmin):
    list_display = ('file','owner','uploaded_time','subject','description','publish')
