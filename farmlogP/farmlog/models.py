from django.db import models
from django.conf import settings

class FarmLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    lunar_date = models.DateField(null=True, blank=True)
    max_temp = models.FloatField(null=True, blank=True)
    min_temp = models.FloatField(null=True, blank=True)
    weather = models.CharField(max_length=50, null=True, blank=True)
    content = models.TextField()
    title = models.CharField(max_length=100, default='Default Title')  # 기본값 추가

    def __str__(self):
        return f"{self.date} - {self.title}"