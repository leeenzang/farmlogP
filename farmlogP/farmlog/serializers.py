from rest_framework import serializers
from .models import FarmLog

class FarmLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = FarmLog
        fields = '__all__'