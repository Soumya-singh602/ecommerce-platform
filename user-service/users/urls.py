from django.urls import path
from .views import register_user , login_user , user_list , user_detail , delete_user , verify_token
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', register_user),
    path("login/", login_user),
     path("", user_list, name="user-list"),
     path("<int:id>/", user_detail, name="user-detail"),
      path("<int:id>/delete/", delete_user, name="delete-user"),
      path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
      path("verify/", verify_token),
]

   
