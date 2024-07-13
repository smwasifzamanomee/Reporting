from django.shortcuts import render
from rest_framework import generics
from .serializers import DepartmentSerializer, CourseSerializer, StudentSerializer
from .models import Department, Course, Student
from rest_framework.permissions import IsAuthenticated
from utils.pagination import CustomPageNumberPagination
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class DepartmentApiView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        paginator = CustomPageNumberPagination()

        departments = Department.objects.all().order_by('-id')
        paginated_departments = paginator.paginate_queryset(departments, request)
        serializer = DepartmentSerializer(paginated_departments, many=True)
        data = serializer.data
        result = {
            "results": data,
            "message": "All Departments list",
            "status": status.HTTP_200_OK,
            "count": departments.count(),
            "next": paginator.get_next_link(),
            "previous": paginator.get_previous_link(),

        }
        return Response(result, status=status.HTTP_200_OK)

class DepartmentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]

class CourseApiView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        paginator = CustomPageNumberPagination()

        courses = Course.objects.all().order_by('-id')
        paginated_courses = paginator.paginate_queryset(courses, request)
        serializer = CourseSerializer(paginated_courses, many=True)
        data = serializer.data
        result = {
            "results": data,
            "message": "All Courses list",
            "status": status.HTTP_200_OK,
            "count": courses.count(),
            "next": paginator.get_next_link(),
            "previous": paginator.get_previous_link(),

        }
        return Response(result, status=status.HTTP_200_OK)
    
class CourseRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    
class StudentApiView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        paginator = CustomPageNumberPagination()

        students = Student.objects.all().order_by('-id')
        paginated_students = paginator.paginate_queryset(students, request)
        serializer = StudentSerializer(paginated_students, many=True)
        data = serializer.data
        result = {
            "results": data,
            "message": "All Students list",
            "status": status.HTTP_200_OK,
            "count": students.count(),
            "next": paginator.get_next_link(),
            "previous": paginator.get_previous_link(),

        }
        return Response(result, status=status.HTTP_200_OK)

class StudentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
    
class DepartmentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        departments = Department.objects.all().order_by('-id')
        department_data = []

        for department in departments:
            courses_count = Course.objects.filter(department=department).count()
            students_count = Student.objects.filter(department=department).count()
            department_data.append({
                'id': department.id,
                'name': department.name,
                'create_at': department.create_at,
                'courses_count': courses_count,
                'students_count': students_count
            })

        return Response({
            "results": department_data,
            "message": "Department details with courses and students count",
            "status": status.HTTP_200_OK
        })