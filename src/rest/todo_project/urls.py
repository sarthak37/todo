from django.urls import path, include
from rest_framework.routers import DefaultRouter
from todo_app.views import ToDoViewSet

router = DefaultRouter()
router.register(r'todos', ToDoViewSet, basename='todo')


urlpatterns = [
    path('', include(router.urls)),
]
