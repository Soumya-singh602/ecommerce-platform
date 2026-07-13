from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ChangePasswordSerializer

from .models import CustomUser
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserListSerializer,
    UpdateProfileSerializer,
    ChangePasswordSerializer
)
from django.contrib.auth.hashers import check_password


# REGISTER USER
@api_view(["POST"])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "status": "success",
                "message": "User created successfully",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(
        {
            "status": "failed",
            "message": "Validation failed",
            "data": serializer.errors,
        },
        status=status.HTTP_400_BAD_REQUEST,
    )


# LOGIN USER
@api_view(["POST"])
def login_user(request):

    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "status": "success",
                "message": "Login successful",
                "data": {
                    "user_id": user.id,
                    "email": user.email,
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
            },
            status=status.HTTP_200_OK,
        )

    return Response(
        {
            "status": "failed",
            "message": "Invalid credentials",
            "data": serializer.errors,
        },
        status=status.HTTP_400_BAD_REQUEST,
    )


# USER LIST
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_list(request):

    users = CustomUser.objects.all()

    serializer = UserListSerializer(users, many=True)

    return Response(
        {
            "status": "success",
            "message": "Users fetched successfully",
            "data": serializer.data,
        },
        status=status.HTTP_200_OK,
    )


# USER DETAIL
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_detail(request, id):

    try:
        user = CustomUser.objects.get(id=id)

    except CustomUser.DoesNotExist:

        return Response(
            {
                "status": "failed",
                "message": "User not found",
                "data": None,
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = UserListSerializer(user)

    return Response(
        {
            "status": "success",
            "message": "User fetched successfully",
            "data": serializer.data,
        },
        status=status.HTTP_200_OK,
    )


# DELETE USER
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request, id):

    try:
        user = CustomUser.objects.get(id=id)

    except CustomUser.DoesNotExist:

        return Response(
            {
                "status": "failed",
                "message": "User not found",
                "data": None,
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    user.delete()

    return Response(
        {
            "status": "success",
            "message": "User deleted successfully",
            "data": None,
        },
        status=status.HTTP_200_OK,
    )


# VERIFY TOKEN
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def verify_token(request):

    user = request.user

    response = Response(
        {
            "status": "success",
            "message": "Token verified successfully",
        },
        status=status.HTTP_200_OK,
    )

    response["X-User-Id"] = str(user.id)
    response["X-User-Email"] = user.email

    return response

# USER PROFILE
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_profile(request):

    try:

        user = CustomUser.objects.get(id=request.user.id)

    except CustomUser.DoesNotExist:

        return Response(
            {
                "status": "failed",
                "message": "User not found",
                "data": None
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = UserListSerializer(user)

    return Response(
        {
            "status": "success",
            "message": "Profile fetched successfully",
            "data": serializer.data
        },
        status=status.HTTP_200_OK
    )

# UPDATE PROFILE
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_profile(request):

    serializer = UpdateProfileSerializer(
        request.user,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "status": "success",
                "message": "Profile updated successfully",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )

    return Response(
        {
            "status": "failed",
            "message": "Validation failed",
            "data": serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
    )

# CHANGE PASSWORD
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def change_password(request):

    serializer = ChangePasswordSerializer(data=request.data)

    if not serializer.is_valid():

        return Response(
            {
                "status": "failed",
                "message": "Validation failed",
                "data": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = request.user

    old_password = serializer.validated_data["old_password"]
    new_password = serializer.validated_data["new_password"]

    if not check_password(old_password, user.password):

        return Response(
            {
                "status": "failed",
                "message": "Old password is incorrect",
                "data": None
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user.set_password(new_password)
    user.save()

    return Response(
        {
            "status": "success",
            "message": "Password changed successfully",
            "data": None
        },
        status=status.HTTP_200_OK
    )