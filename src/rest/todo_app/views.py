from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import ToDo
from .serializers import ToDoSerializer
from pymongo import MongoClient
from bson import ObjectId

class ToDoViewSet(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer

    def get_queryset(self):
        client = MongoClient('mongodb+srv://sarthak27998:HDvcUpA3POdltsJu@cluster0.8zfhr2b.mongodb.net/?retryWrites=true&w=majority')
        db = client['todo_app']
        todos = db.todos
        return todos.find()

    def create(self, request):
        client = MongoClient('mongodb+srv://sarthak27998:HDvcUpA3POdltsJu@cluster0.8zfhr2b.mongodb.net/?retryWrites=true&w=majority')
        db = client['todo_app']
        todos = db.todos
        serializer = ToDoSerializer(data=request.data)
        if serializer.is_valid():
            todo_data = serializer.validated_data
            todo_data['_id'] = ObjectId() 
            todos.insert_one(todo_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

