import fitz
import json

def extract_text():
    pdf_document = fitz.open("random.pdf")
    text_data = []
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        words = page.get_text("words")
        page_data = {'page': page_num, 'words': words, 'width': page.rect.width, 'height': page.rect.height,}
        text_data.append(page_data)
    
    print(text_data[0]['height'])
    return text_data
    
def extract_sentences(text_data):
    sentence_data = []
    sentence_create = []

    for page_data in text_data:
        for word in page_data['words']:
            sentence_create.append(word)

            if (word[4][-1] == '.') :
                sentence_data.append(sentence_create)
                sentence_create = []
                
data = extract_sentences(extract_text())

with open("pdf_data.json", "w") as f:
    json.dump(data, f)