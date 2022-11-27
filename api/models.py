from email.policy import default
from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):

    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False, blank=True, null=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        return self.title