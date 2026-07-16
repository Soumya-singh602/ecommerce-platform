from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'password' , 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
    


class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()

    password = serializers.CharField(write_only=True)

    def validate(self, data):

        email = data.get("email")

        password = data.get("password")

        user = authenticate(
            username=email,
            password=password
        )

        if not user:

            raise serializers.ValidationError(
                "Invalid Email or Password"
            )

        data["user"] = user

        return data
    
class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "role",
            "created_at",
        ]

class UpdateProfileSerializer(serializers.ModelSerializer):

    class Meta:

        model = CustomUser

        fields = [
            "first_name",
            "last_name"
        ]

class ChangePasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):

        validate_password(value)

        return value