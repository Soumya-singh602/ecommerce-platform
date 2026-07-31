from urllib.parse import parse_qs

from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.tokens import AccessToken


class JWTAuthMiddleware(BaseMiddleware):

    async def __call__(
        self,
        scope,
        receive,
        send
    ):

        query_string = scope["query_string"].decode()

        params = parse_qs(query_string)

        token = params.get("token")

        if token:

            try:

                access_token = AccessToken(
                    token[0]
                )
                print(
                  "TOKEN PAYLOAD:",
                     access_token.payload
                )


                scope["user_id"] = str(
                    access_token["user_id"]
                )

                scope["email"] = access_token.get(
                    "email",
                    ""
                )

                scope["role"] = access_token.get(
                    "role",
                    ""
                )


                print(
                    "JWT USER:",
                    scope["user_id"]
                )

                print(
                    "JWT EMAIL:",
                    scope["email"]
                )

                print(
                    "JWT ROLE:",
                    scope["role"]
                )


            except Exception as e:

                print(
                    "JWT ERROR:",
                    e
                )


        return await super().__call__(
            scope,
            receive,
            send
        )