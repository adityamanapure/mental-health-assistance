"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from chatbot.urls import urlpatterns as chatbot_urls
from accounts.urls import urlpatterns as accounts_urls
from mood_tracker.urls import urlpatterns as mood_tracker_urls
from journal.urls import urlpatterns as journal_urls



urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('accounts.urls')),
    path('mood/', include('mood_tracker.urls')),
    path('journal/', include('journal.urls')),
    path('chatbot/', include('chatbot.urls')),


]

