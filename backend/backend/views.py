from rest_framework.decorators import api_view
from rest_framework.response import Response
from projects.models import User

@api_view(['GET'])
def send_some_data(request):
    return Response({
        "data": f"Users: {list(User.objects.values_list('name', flat=True))}"
    })