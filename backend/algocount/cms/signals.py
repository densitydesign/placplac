from cms.models import GlossaryCategory


def init_db(sender, **kwargs):
    GlossaryCategory.objects.get_or_create(title="Techniques",
                     description="A list of basic methods for making and replicating the procedures present throughout the experiments.",
                     color="#FF6B6B")
    GlossaryCategory.objects.get_or_create(title="Tools",
                     description="We careful try to choose online, free and open tools and web apps.",
                     color="#000000")