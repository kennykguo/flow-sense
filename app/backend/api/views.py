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






from rest_framework.response import Response
from rest_framework.decorators import api_view
import openai
import environ
import os
import time

# Load environment variables
env = environ.Env()

# Check if .env file exists and load it
env_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(env_path):
    environ.Env.read_env(env_path)
    print(".env file loaded from:", env_path)
else:
    print(".env file not found at:", env_path)

# Set OpenAI API key
api_key = env('OPENAI_API_KEY')
openai.api_key = api_key

# Debugging: Print the API key to verify it is loaded correctly (remove this in production)
print("API Key Loaded:", api_key)

from rest_framework.response import Response
from rest_framework.decorators import api_view
import openai
import environ
import os
import time

# Load environment variables
env = environ.Env()

# Check if .env file exists and load it
env_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(env_path):
    environ.Env.read_env(env_path)
    print(".env file loaded from:", env_path)
else:
    print(".env file not found at:", env_path)

# Set OpenAI API key
api_key = env('OPENAI_API_KEY')
openai.api_key = api_key

# Debugging: Print the API key to verify it is loaded correctly (remove this in production)
print("API Key Loaded:", api_key)



@api_view(['POST'])
def explain_text(request):
    # Retrieve the current_text from the request
    current_text = request.data.get('current_text', '')

    # Construct the prompt for the API
    prompt = f"Explain the following text in simple terms, in less 3 sentences:\n\n{current_text}"
    print("Received prompt:", prompt)  # Log the prompt for debugging

    try:
        # Rate limiting: Wait for a short period between requests
        time.sleep(1)  # Adjust the sleep time as needed

        # Use the latest method for OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Use a valid model name
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        explanation = response['choices'][0]['message']['content'].strip()
        return Response({'explanation': explanation}, status=200)
    except openai.error.AuthenticationError as e:
        print("Authentication Error:", str(e))  # Log the error message
        return Response({'error': 'Authentication error. Please check your API key.'}, status=401)
    except openai.error.RateLimitError as e:
        print("Rate Limit Error:", str(e))  # Log the error message
        return Response({'error': 'Rate limit exceeded. Please try again later.'}, status=429)
    except Exception as e:
        print("Error during API request:", str(e))  # Log the error message
        return Response({'error': str(e)}, status=500)

# Debugging: Check if the .env file is in the correct directory
print(".env file exists:", os.path.exists(env_path))
