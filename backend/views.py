'''
views for backend
'''
from django.http import JsonResponse

# Create your views here.

def index(request):
    '''
    render /api
    '''
    mes = dict()
    mes['message'] = "Hello Software Engineering!"
    return JsonResponse(mes)
