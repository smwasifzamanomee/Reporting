from django.db import models

# Create your models here.

class Department(models.Model):
    name = models.CharField(max_length=100)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.name}.  id = {self.id}"

class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.name}.  id = {self.id}"


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.name}.  id = {self.id}"