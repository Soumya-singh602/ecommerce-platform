from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ChangePasswordSerializer
from ecommerce_common.response import success_response
from ecommerce_common.exceptions import NotFoundException
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken
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

        return success_response(
          message="Login successful",
          data={
             "user_id": user.id,
             "email": user.email,
              "role": user.role,
             "access": str(refresh.access_token),
             "refresh": str(refresh),
      },
    status_code=status.HTTP_200_OK
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

    return success_response(
    message="Users fetched successfully",
    data=serializer.data,
    status_code=status.HTTP_200_OK
)


# USER DETAIL
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_detail(request, id):

    try:
        user = CustomUser.objects.get(id=id)

    except CustomUser.DoesNotExist:
      raise NotFoundException("User not found")

    serializer = UserListSerializer(user)

    return success_response(
         message="User fetched successfully",
         data=serializer.data
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

"""
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
    response["X-User-Role"] = user.role

    return response
    """

# USER PROFILE
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_profile(request):

    try:

        user = CustomUser.objects.get(id=request.user.id)

    except CustomUser.DoesNotExist:
      raise NotFoundException("User not found")

    serializer = UserListSerializer(user)

    return success_response(
        message="Profile fetched successfully",
        data=serializer.data
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

        return success_response(
         message="Profile updated successfully",
         data=serializer.data
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

    return success_response(
       message="Password changed successfully",
       data=None
)

@api_view(["GET"])
def internal_user_detail(request, id):

    try:

        user = CustomUser.objects.get(id=id)

    except CustomUser.DoesNotExist:

        return Response(
            {
                "status": "failed",
                "message": "User not found"
            },
            status=404
        )


    serializer = UserListSerializer(user)


    return Response(
        {
            "status":"success",
            "data":serializer.data
        }
    )

@api_view(["GET"])
def internal_user_list(request):

    users = CustomUser.objects.all().order_by("-created_at")

    search = request.GET.get("search")

    if search:

        users = users.filter(

            Q(first_name__icontains=search) |

            Q(last_name__icontains=search) |

            Q(email__icontains=search)

        )

    page = request.GET.get("page", 1)

    paginator = Paginator(users, 5)

    try:

        page_obj = paginator.page(page)

    except EmptyPage:

        return Response(
            {
                "status": "failed",
                "message": "Page does not exist",
                "data": None,
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = UserListSerializer(page_obj, many=True)

    return Response(
        {
            "status": "success",
            "data": {

                "customers": serializer.data,

                "current_page": page_obj.number,

                "total_pages": paginator.num_pages,

                "total_customers": paginator.count,

            },
        },
        status=status.HTTP_200_OK,
    )

@api_view(["GET"])
def verify_token(request):

    print("GET params:", request.GET)
    print("Authorization:", request.headers.get("Authorization"))
    print("Original URI:", request.headers.get("X-Original-URI"))


    token = None


    # =========================
    # 1. Authorization Header
    # =========================

    auth_header = request.headers.get("Authorization")


    if auth_header and auth_header.startswith("Bearer "):

        token = auth_header.split(" ")[1]



    # =========================
    # 2. Query Parameter
    # =========================

    if not token:

        token = request.GET.get("token")



    # =========================
    # 3. Nginx WebSocket URI
    # =========================

    if not token:

        original_uri = request.headers.get(
            "X-Original-URI",
            ""
        )


        if "token=" in original_uri:

            token = original_uri.split("token=")[1]



    print("FINAL TOKEN:", token)



    if not token:

        return Response(
            {
                "error": "Token missing"
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )



    try:

        access = AccessToken(token)

        user = CustomUser.objects.get(
            id=access["user_id"]
        )


    except (InvalidToken, CustomUser.DoesNotExist):

        return Response(
            {
                "error": "Invalid token"
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )



    response = Response(
        {
            "status": "success",
            "message": "Token verified successfully",
        },
        status=status.HTTP_200_OK,
    )


    response["X-User-Id"] = str(user.id)
    response["X-User-Email"] = user.email
    response["X-User-Role"] = user.role


    return response