from rest_framework import serializers
from .models import Department, Course, Student

class DepartmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Department
        fields = ['id', 'name', 'create_at']

class CourseSerializer(serializers.ModelSerializer):
    department_name = serializers.SerializerMethodField()
        
    class Meta:
        model = Course
        fields = ['id', 'name', 'code', 'department', 'department_name', 'create_at']
        
    def get_department_name(self, obj):
        return obj.department.name

class StudentSerializer(serializers.ModelSerializer):
    department_name = serializers.SerializerMethodField()
        
    class Meta:
        model = Student
        fields = ['id', 'name', 'email', 'department', 'department_name', 'create_at']
    
    def get_department_name(self, obj):
        return obj.department.name
