from django.urls import path
from . import views

app_name = 'perfiles'

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.loginPage, name='login'),
    path('', views.home, name='home'),
    path('logout/', views.logout_view, name='logout'),
]