from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("papers/", views.ResearchPaperListCreate.as_view(), name="paper-list"),
    path("papers/<int:pk>/", views.ResearchPaperDetail.as_view(), name="paper-detail"),
    path("papers/<int:pk>/comments/", views.CommentListCreate.as_view(), name="comment-list"),
    path("comments/delete/<int:pk>/", views.CommentDelete.as_view(), name="delete-comment"),
    path("explain/", views.explain_text, name="explain_text"),
    path('upload/', views.FileUploadView.as_view(), name='file-upload'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
