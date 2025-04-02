from django.db import models

class Resource(models.Model):
    RESOURCE_TYPES = [
        ('article', 'Article'),
        ('video', 'Video'),
        ('website', 'Website'),
        ('book', 'Book'),
        ('podcast', 'Podcast'),
        ('app', 'App'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    url = models.URLField()
    resource_type = models.CharField(max_length=10, choices=RESOURCE_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title