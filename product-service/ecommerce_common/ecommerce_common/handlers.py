from rest_framework.views import exception_handler
from rest_framework.response import Response

from ecommerce_common.exceptions import EcommerceException


def ecommerce_exception_handler(exc, context):

    if isinstance(exc, EcommerceException):
        return Response(
            {
                "success": False,
                "message": exc.message
            },
            status=exc.status_code
        )

    return exception_handler(exc, context)