from django.db.models.signals import post_save
from django.dispatch import receiver

from cms.models import GlossaryCategory, Project


@receiver(post_save, sender=Project)
def create_categories(sender, instance, created, **kwargs):
    if created:
        GlossaryCategory.objects.get_or_create(title="Techniques",
                         description="A list of basic methods for making and replicating the procedures present throughout the experiments.",
                         color="#FF6B6B", project=instance)
        GlossaryCategory.objects.get_or_create(title="Tools",
                         description="We careful try to choose online, free and open tools and web apps.",
                         color="#000000", project=instance)


