from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from utils.pagination import CustomPageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny

#import status

# Create your views here.




class LogInView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        
        if email is None or password is None:
            return Response({'message': 'Please provide both email and password.','status': status.HTTP_400_BAD_REQUEST}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'User with this email does not exist.','status': status.HTTP_404_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND)
        
        user = authenticate(request, email=email, password=password)
        
        if user is None:
            return Response({'message': 'Invalid email or password.','status': status.HTTP_401_UNAUTHORIZED}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)        
        results = {
            'access_token': str(refresh.access_token),
            'refresh': str(refresh),
            'message': 'Successfully logged in.',
            'username': user.username,
            'email': user.email,
            'status': status.HTTP_200_OK,
        }
        
        return Response(results, status=status.HTTP_200_OK)

class LogOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({'message': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Invalid refresh token.'}, status=status.HTTP_400_BAD_REQUEST)
    
class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        paginator = CustomPageNumberPagination()
        users = User.objects.all().order_by('-id')
        paginated_users = paginator.paginate_queryset(users, request)
        serializer = UserSerializer(paginated_users, many=True)
        data = serializer.data
        result = {
            "results": data,
            "message": "All products with quantity",
            "count": users.count(),
            "next": paginator.get_next_link(),
            "previous": paginator.get_previous_link(),
            "status": status.HTTP_200_OK,
        }
        return Response(result, status=status.HTTP_200_OK)