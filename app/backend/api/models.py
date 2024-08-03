from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

class ResearchPaper(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='your_upload_directory/')
    banner_url = models.URLField(blank=True)  # Add this if you want to store a URL for a paper's banner
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    paper = models.ForeignKey(ResearchPaper, on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return f"Comment by {self.author.username} on {self.paper.title}"
