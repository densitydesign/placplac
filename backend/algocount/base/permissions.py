from rest_framework.permissions import DjangoModelPermissions


class DjangoModelViewPermissions(DjangoModelPermissions):
    """
    Create our own permissions class to account for the custom "view" permission
    that needs to be created on any of our models.
    """

    perms_map = {
        'GET': ['%(app_label)s.view_%(model_name)s'],
        'OPTIONS': [],
        'HEAD': ['%(app_label)s.view_%(model_name)s'],
        'POST': ['%(app_label)s.change_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.change_%(model_name)s'],
    }

    def has_permission(self, request, view):
        if not request.user or (
                not request.user.is_authenticated and self.authenticated_users_only):
            return False
        if request.method == 'OPTIONS':
            return True
        return super(DjangoModelViewPermissions, self).has_permission(request, view)
