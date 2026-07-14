def get_user_info(request):
    return {
        "user_id": request.headers.get("X-User-Id"),
        "user_email": request.headers.get("X-User-Email"),
    }