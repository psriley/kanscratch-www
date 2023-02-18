from rest_framework.decorators import api_view
from rest_framework.response import Response
from projects.models import User

"""
Returns a list of all users in the system using DRF.
"""
@api_view(['GET'])
def users_list(request):
    return Response({
        "users": f"{list(User.objects.values_list('name', flat=True))}"
    })
