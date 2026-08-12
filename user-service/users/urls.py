from django.urls import path

from .views import (
    register_user,
    login_user,
    user_list,
    user_detail,
    delete_user,
    verify_token,
    user_profile,
    update_profile,
    change_password,
    internal_user_detail,
    internal_user_list,
    health_check,
    my_wishlist,
    check_wishlist,
    remove_from_wishlist,
    add_to_wishlist,
)

from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [

    # ============================================================
    # AUTH
    # ============================================================

    path(
        "register/",
        register_user,
        name="register",
    ),

    path(
        "login/",
        login_user,
        name="login",
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),


    # ============================================================
    # USERS
    # ============================================================

    path(
        "",
        user_list,
        name="user-list",
    ),

    path(
        "profile/",
        user_profile,
        name="user-profile",
    ),

    path(
        "profile/update/",
        update_profile,
        name="update-profile",
    ),

    path(
        "<int:id>/",
        user_detail,
        name="user-detail",
    ),

    path(
        "<int:id>/delete/",
        delete_user,
        name="delete-user",
    ),

    path(
        "verify/",
        verify_token,
        name="verify-token",
    ),

    path(
        "change-password/",
        change_password,
        name="change-password",
    ),


    # ============================================================
    # INTERNAL
    # ============================================================

    path(
        "internal/<int:id>/",
        internal_user_detail,
        name="internal-user-detail",
    ),

    path(
        "internal/",
        internal_user_list,
        name="internal-user-list",
    ),

    path(
        "health/",
        health_check,
        name="health",
    ),


    # ============================================================
    # WISHLIST
    # ============================================================

    path(
        "wishlist/add/",
        add_to_wishlist,
        name="add-to-wishlist",
    ),

    path(
        "wishlist/",
        my_wishlist,
        name="my-wishlist",
    ),

    path(
        "wishlist/remove/<int:product_id>/",
        remove_from_wishlist,
        name="remove-from-wishlist",
    ),

    path(
        "wishlist/check/<int:product_id>/",
        check_wishlist,
        name="check-wishlist",
    ),
]