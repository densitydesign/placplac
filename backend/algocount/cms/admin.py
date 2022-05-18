from django.contrib import admin

from cms.models import *

admin.site.register(Project)
admin.site.register(ProjectUser)
admin.site.register(ProjectMedia)
admin.site.register(GlossaryCategory)

