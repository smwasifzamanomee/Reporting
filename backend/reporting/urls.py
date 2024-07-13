from django.urls import path
from .views import DepartmentApiView, DepartmentRetrieveUpdateDestroy, CourseApiView, CourseRetrieveUpdateDestroy, StudentApiView, StudentRetrieveUpdateDestroy, DepartmentDetailView

urlpatterns = [
    path('department/', DepartmentApiView.as_view()),
    path('department/<int:pk>/', DepartmentRetrieveUpdateDestroy.as_view()),
    path('course/', CourseApiView.as_view()),
    path('course/<int:pk>/', CourseRetrieveUpdateDestroy.as_view()),
    path('student/', StudentApiView.as_view()),
    path('student/<int:pk>/', StudentRetrieveUpdateDestroy.as_view()),
    path('department-details/', DepartmentDetailView.as_view(), name='department-details'),
]