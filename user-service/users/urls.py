from django.urls import path
from .views import register_user , login_user , user_list , user_detail , delete_user , verify_token , user_profile , update_profile , change_password
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', register_user),
    path("login/", login_user),
     path("", user_list, name="user-list"),
     path("profile/", user_profile, name="user-profile"),
     path("profile/update/", update_profile, name="update-profile"),
     path("<int:id>/", user_detail, name="user-detail"),
      path("<int:id>/delete/", delete_user, name="delete-user"),
      path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
      path("verify/", verify_token),
      path("change-password/", change_password, name="change-password"),
]

   
