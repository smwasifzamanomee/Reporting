from rest_framework import serializers
from .models import User



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'date_joined', 'last_login']