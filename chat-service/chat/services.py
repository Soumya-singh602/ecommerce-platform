import os
import requests


USER_SERVICE_URL = os.getenv(
    "USER_SERVICE_URL",
    "http://127.0.0.1:8001"
)


def get_user_details(user_id, token):

    response = requests.get(
        f"{USER_SERVICE_URL}/users/{user_id}/",
        headers={
            "Authorization": token
        },
        timeout=10
    )

    print("USER SERVICE STATUS:", response.status_code)
    print("USER SERVICE RESPONSE:", response.text)

    if response.status_code == 200:

        data = response.json()

        return data.get("data", data)

    return {}