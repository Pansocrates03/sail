from django.urls import path
from . import views

app_name = 'levels'

urlpatterns = [
    path('', views.avance, name='avance'),
    path('nivel/', views.nivel, name='level'),
]

# path('register/', views.register, name='register'),