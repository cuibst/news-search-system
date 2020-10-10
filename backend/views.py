'''
views for backend
'''
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User

# Create your views here.

def index(request):
    '''
    render /api
    '''
    mes = dict()
    mes['message'] = "Hello Software Engineering!"
    return JsonResponse(mes)

@csrf_exempt
def login(request):
    '''
    login
    '''
    print(request.method)
    print("GET HERE")
    if request.method == 'POST':
        name = request.POST.get('username')
        password = request.POST.get('password')
        print(name, password)
        user = User.objects.filter(name=name).first()
        if not user:
            return JsonResponse({
                'code': 401,
                'data': "invalid user",
                'token': 'WA1'
            }, status=200)
        password0 = user.password
        if password0 == password:
            return JsonResponse({
                'code': 200,
                'data': 'login successfully',
                'token': 'AC'
            }, status=200)
        return JsonResponse({
            'code': 401,
            'data': 'wrong password',
            'token': 'WA2'
        }, status=200)
    return JsonResponse({
        'code': 405,
        'data': 'invalid method',
        'token': 'WA3'
    }, status=200)
