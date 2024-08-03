import fitz
import json
from django.http import JsonResponse
from django.http import HttpResponse
import os
from django.conf import settings
from pdf2image import convert_from_path

def home(request):
    return HttpResponse("Welcome to the PDF Viewer API. Use /api/pdf-data/ to get PDF data.")

def convert_pdf_to_images(pdf_path):
    images = convert_from_path(pdf_path)
    image_paths = []
    for i, image in enumerate(images):
        image_path = os.path.join(settings.MEDIA_ROOT, f'page_{i}.png')
        image.save(image_path, 'PNG')
        image_paths.append(image_path)
    return image_paths

def extract_text():
    pdf_path = os.path.join(settings.BASE_DIR, 'static', 'random.pdf')
    pdf_document = fitz.open(pdf_path)
    text_data = []
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        words = page.get_text("words")
        formatted_words = [
            {'x0': word[0], 'y0': word[1], 'x1': word[2], 'y1': word[3], 'text': word[4]}
            for word in words
        ]
        page_data = {'page': page_num, 'words': formatted_words, 'width': page.rect.width, 'height': page.rect.height,}
        text_data.append(page_data)
    
    return text_data
    
def extract_sentences(text_data):
    sentenced_page_data = []

    for page_data in text_data:
        sentence_data = []
        sentence_create = []

        for word in page_data['words']:
            sentence_create.append(word)

            if (word['text'][-1] == '.') :
                sentence_data.append(sentence_create)
                sentence_create = []
        
        sentenced_page_data.append({ 'page': page_data['page'], 'sentences': sentence_data, 'width': page_data['width'],
            'height': page_data['height']})

    return sentenced_page_data

def get_pdf_data(request):
    text_data = extract_text()
    sentenced_data = extract_sentences(text_data)
    return JsonResponse({'data': sentenced_data})