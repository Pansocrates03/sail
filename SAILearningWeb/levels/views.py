from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from perfiles.models import Perfil

@login_required(login_url="/login/")
def avance(request):
    user = request.user
    perfil = Perfil.objects.get(usuario=user)
    return render(request, 'levels/app.html', context={'user':user, 'perfil':perfil})

@login_required(login_url="/login/")
def nivel(request):
    user = request.user
    perfil = Perfil.objects.get(usuario=user)


    
    return render(request, 'levels/level.html', context={'user':user, 'perfil':perfil})
