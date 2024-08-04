import PyPDF2
import plotly.graph_objects as go
import re

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

def parse_paper_structure(text):
    sections = {}
    current_section = "Abstract"
    sections[current_section] = ""
    
    lines = text.split('\n')
    for line in lines:
        if re.match(r'^[1-9]\.\s', line):  # Main section
            current_section = line.strip()
            sections[current_section] = ""
        elif re.match(r'^[1-9]\.[1-9]\s', line):  # Subsection
            current_section = line.strip()
            sections[current_section] = ""
        else:
            sections[current_section] += line + " "
    
    return sections

def create_treemap(sections):
    labels = list(sections.keys())
    parents = [""] + ["Paper"] * (len(labels) - 1)
    values = [len(content.split()) for content in sections.values()]
    
    fig = go.Figure(go.Treemap(
        labels=labels,
        parents=parents,
        values=values,
        textinfo="label+value",
        hovertemplate='<b>%{label}</b><br>Words: %{value}<extra></extra>'
    ))
    
    fig.update_layout(
        title="Research Paper Structure",
        width=800,
        height=600
    )
    
    return fig

# Main execution
pdf_path = "example_research_paper.pdf"
text = extract_text_from_pdf(pdf_path)
sections = parse_paper_structure(text)
fig = create_treemap(sections)
fig.show()