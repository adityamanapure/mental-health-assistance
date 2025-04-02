from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone
from .models import CustomUser

@receiver(pre_save, sender=CustomUser)
def set_user_timestamps(sender, instance, **kwargs):
    # Only set timestamps when objects are created
    if instance._state.adding:
        instance.date_joined = timezone.now()


@receiver(pre_save, sender=CustomUser)
def set_default_bio(sender, instance, **kwargs):
    # Ensure bio is never None/null
    if instance.bio is None:
        instance.bio = "" 