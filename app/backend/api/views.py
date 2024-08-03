from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import openai

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import openai

@api_view(['POST'])
def explain_text(request):
    # Retrieve the current_text from the request
    current_text = request.data.get('current_text', '')

    # Construct the prompt for the API
    prompt = f"Explain the following text:\n\n{current_text}"

    try:
        # Make sure to replace `openai.Completion.create` with the correct function and parameters based on your OpenAI setup
        response = openai.Completion.create(
            engine="text-davinci-003",  # Adjust this to your OpenAI model engine
            prompt=prompt,
            max_tokens=150
        )
        explanation = response.choices[0].text.strip()
        return Response({'explanation': explanation}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
