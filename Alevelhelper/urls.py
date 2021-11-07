"""Alevelhelper URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from usermanage import views

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/user/<int:pk>/', views.UsersView.as_view()),
    path('api/avatar/<int:pk>/', views.UserAvatars.as_view()),
    path('api/file/<int:pk>/<int:subject>/<str:description>/', views.UserFiles.as_view()),
    path('api/file/<int:pk>/',views.UserFiles.as_view()),
    path('api/file/<int:pk>/<int:subject>/',views.UserFiles.as_view()),
    path('api/file/',views.UserFiles.as_view()),
    path('api/users/<int:pk>/',views.User_Info_Provider.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

'''static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)'''
