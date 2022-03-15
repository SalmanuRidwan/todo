from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.utils import timezone
from .models import Todo

def home(request):
    todo_items = Todo.objects.all()
    context = {
        'todo_items': todo_items
    }
    return render(request, 'main/home.html', context)

def add_item(request):
    if request.method == 'POST':
        current_date = timezone.now()
        new_todo = Todo(
            text = request.POST['content'],
            added_date = current_date,
        )
        new_todo.save()
        return redirect('/')
    return render(request, 'main/home.html')

def delete_item(request, todo_id):
    Todo.objects.get(id=todo_id).delete()
    return redirect('/')