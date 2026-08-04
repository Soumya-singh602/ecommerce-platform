import jwt
from django.conf import settings


def get_user_info(request):

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return {
            "user_id": None,
            "user_email": None
        }


    try:

        token = auth_header.split(" ")[1]


        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=["HS256"]
        )


        return {
            "user_id": payload.get("user_id"),
            "user_email": payload.get("email")
        }


    except Exception as e:

        print("JWT ERROR:", e)

        return {
            "user_id": None,
            "user_email": None
        }