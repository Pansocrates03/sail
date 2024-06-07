from django.urls import path
from . import views

app_name = 'levels'

urlpatterns = [
    path('', views.avance, name='avance'),
    path('nivel/<int:nivel>/', views.nivel, name='level'),
    path('actualizar_nivel/', views.actualizar_nivel, name='actualizar_nivel'),
]
