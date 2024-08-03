from django.urls import path
from .views import get_pdf_data

urlpatterns = [
    path('api/pdf-data/', get_pdf_data, name='get_pdf_data'),
]