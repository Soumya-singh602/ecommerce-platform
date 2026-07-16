import requests


def get_user_details(user_id, token):

    response = requests.get(
        f"http://user-service:8001/users/{user_id}/",
        headers={
            "Authorization": token
        }
    )


    if response.status_code == 200:

        data = response.json()

        return data.get("data", {})


    print(response.text)

    return {}