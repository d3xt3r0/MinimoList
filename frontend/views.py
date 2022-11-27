from django.shortcuts import render, redirect
from django.contrib.auth import get_user, authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm

# Create your views here.


def listView(request):
    return render(request, 'frontend/list-view.html')

def listViewLocal(request):
    return render(request, 'frontend/list-view-local.html')

def login_view(request):


    if request.user.is_authenticated:
        logout(request)
        return redirect('list-view')


    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request, 'User does not exist')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('list-view')
        else:
            messages.error(request, 'Username or password, incorrect')

    context = {'login':'login'}
    return render(request, 'frontend/login_register.html', context)

def register_view(request):

    form = UserCreationForm()

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()

            login(request, user)
            return redirect('list-view')


    context = {'form':form}
    return render(request, 'frontend/login_register.html', context)