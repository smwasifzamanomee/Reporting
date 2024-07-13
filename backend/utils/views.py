from rest_framework.views import APIView
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status
from reporting.models import Department, Course, Student
from rest_framework.permissions import IsAuthenticated
class MetricsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        departments = Department.objects.all()
        courses = Course.objects.all()
        students = Student.objects.all()
        return Response({
            'departments': departments.count(),
            'courses': courses.count(),
            'students': students.count(),
            'timestamp': timezone.now()
        }, status=status.HTTP_200_OK)
    
    