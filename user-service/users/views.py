from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegisterSerializer, LoginSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import CustomUser
from .serializers import UserListSerializer
from django.shortcuts import get_object_or_404


@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created"})
    return Response(serializer.errors, status=400)

@api_view(["POST"])
def login_user(request):

    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Login Successful",

                "access": str(refresh.access_token),

                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_list(request):

    users = CustomUser.objects.all()

    serializer = UserListSerializer(users, many=True)

    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_detail(request, id):

    user = get_object_or_404(CustomUser, id=id)

    serializer = UserListSerializer(user)

    return Response(serializer.data)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request, id):

    user = get_object_or_404(CustomUser, id=id)

    user.delete()

    return Response(
        {
            "message": "User deleted successfully"
        },
        status=status.HTTP_200_OK
    )

