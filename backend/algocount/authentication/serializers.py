import os

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.mail import send_mail
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class DefaultTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        # Add extra responses here
        data['username'] = self.user.email
        data['role'] = [obj.name for obj in self.user.groups.only("name")]
        data['permissions'] = self.user.get_all_permissions()
        return data


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only=True)

    def update(self, instance, validated_data):
        if not instance.is_active and "is_active" in validated_data and validated_data["is_active"] == True:
            send_mail(
                'Account activated',
                'Your account is active',
                os.getenv("EMAIL_HOST_USER"),
                [instance.email],
                fail_silently=False,
            )
        return super().update(instance, validated_data)

    class Meta:
        model = User
        fields = ["id", "email", "first_name",
                  "last_name",
                  "is_active",
                  "is_superuser", ]


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create(**validated_data, is_active=False)
        user.set_password(validated_data['password'])
        user.save()
        group, result= Group.objects.get_or_create("editor")
        user.groups.add(group)
        users = User.objects.filter(is_superuser=True)
        send_mail(
            'New user',
            'New user {} {} registered to {} with username {}'.format(user.first_name, user.last_name,os.getenv("PLATFORM_NAME"),
                                                                             user.email),
            os.getenv("EMAIL_HOST_USER"),
            [user.email for user in users],
            fail_silently=False,
        )
        return user

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "password",
                  "last_name", "password2"]
        extra_kwargs = {"password": {"write_only": True}}
