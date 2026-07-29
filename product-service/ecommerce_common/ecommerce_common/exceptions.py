from rest_framework.exceptions import APIException
from rest_framework import status


class EcommerceException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST

    def __init__(self, message):
        self.message = message
        super().__init__(detail=message)


class NotFoundException(EcommerceException):
    status_code = status.HTTP_404_NOT_FOUND