import fitz

def extract_text():
    pdf_document = fitz.open("random.pdf")
    text_data = []
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        words = page.get_text("words")
        blocks = page.get_text("blocks")
        page_data = {'page': page_num, 'words': words, 'blocks': blocks}
        text_data.append(page_data)
        
    
    print(text_data[1]['words'])

extract_text()