from rest_framework import viewsets, permissions
from .models import JournalEntry
from .serializers import JournalEntrySerializer

class JournalEntryViewSet(viewsets.ModelViewSet):
    serializer_class = JournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Filter entries by the authenticated user
        return JournalEntry.objects.filter(user=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        # Set the user automatically when creating entries
        serializer.save(user=self.request.user)