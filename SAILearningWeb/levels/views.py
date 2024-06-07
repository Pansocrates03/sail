from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from perfiles.models import Perfil

@login_required(login_url="/login/")
def avance(request):
    user = request.user
    perfil = Perfil.objects.get(usuario=user)
    return render(request, 'levels/app.html', context={'user':user, 'perfil':perfil})


@login_required
def actualizar_nivel(request):
    perfil = request.user.perfil  # Asumimos que tienes una relación OneToOne entre User y Perfil
    perfil.nivel += 1  # Incrementar el nivel del jugador
    perfil.save()  # Guardar los cambios en la base de datos
    return redirect('levels:level', nivel=perfil.nivel)  # Redirigir a la vista del nuevo nivel

@login_required(login_url="/login/")
def nivel(request, nivel):
    user = request.user
    perfil = request.user.perfil
    if perfil.nivel != nivel:
        return redirect('levels:actualizar_nivel')
    return render(request, 'levels/level.html', {'nivel': nivel, 'user': user, 'perfil':perfil})



