from django.urls import path
from .views import LogInView, UserListView, LogOutView
urlpatterns = [
    path('login/', LogInView.as_view(),),
    path('logout/', LogOutView.as_view(),),    
    path('user-list/', UserListView.as_view(),),
]