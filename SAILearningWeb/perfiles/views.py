from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import UserRegistrationForm

def home(request):  
    return render(request, 'perfiles/index.html')

def loginPage(request):
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        username = request.POST.get('username').lower()
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("perfiles:home")  # Redirect to a 'home' page or another relevant page
        else:
            messages.error(request, 'Correo o contraseña no válidos. Vuelve a intentarlo.')

    return render(request, 'perfiles/login.html')

def logoutUser(request):
    logout(request)
    return HttpResponse("Cerraste sesión")

def register(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)

        if user_form.is_valid():
            user = user_form.save(commit=False)
            user.set_password(user_form.cleaned_data['password'])
            user.save()

            login(request, user)
            return HttpResponse('usuario registrado')  # Redirect to a home page or any other page

        else:
            messages.error(request, 'Error al crear la cuenta. Por favor, vuelve a intentarlo.')
    else:
        user_form = UserRegistrationForm()

    context = {
        'user_form': user_form
    }
    return render(request, 'perfiles/register.html', context)