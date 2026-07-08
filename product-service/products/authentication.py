import requests

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed


class UserServiceAuthentication(BaseAuthentication):

    def authenticate(self, request):

        auth_header = request.headers.get("Authorization")

        print("AUTH HEADER =", auth_header)

        if not auth_header:
            raise AuthenticationFailed("Authorization header missing")

        response = requests.get(
            "http://127.0.0.1:8001/users/verify/",
            headers={
                "Authorization": auth_header
            }
        )

        print("STATUS =", response.status_code)
        print("BODY =", response.text)

        if response.status_code != 200:
            raise AuthenticationFailed(response.text)

        user_data = response.json()

        return (user_data, None)