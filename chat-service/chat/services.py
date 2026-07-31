import os
import requests


USER_SERVICE_URL = os.getenv(
    "USER_SERVICE_URL",
    "https://user-service-ngrs.onrender.com"
)


def get_user_details(user_id, token):

    response = requests.get(
        f"{USER_SERVICE_URL}/users/{user_id}/",
        headers={
            "Authorization": token
        },
        timeout=10
    )

    if response.status_code == 200:

        data = response.json()

        return data.get("data", {})

    print(response.text)

    return {}