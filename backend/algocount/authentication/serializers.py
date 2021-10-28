from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class DefaultTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        # Add extra responses here
        data['username'] = self.user.username
        data['role'] = [obj.name for obj in self.user.groups.only("name")]
        data['permissions'] = self.user.get_all_permissions()
        return data
