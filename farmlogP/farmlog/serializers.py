from rest_framework import serializers
from .models import FarmLog

class FarmLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = FarmLog
        fields = '__all__'
    
    def create(self, validated_data):
        if 'date' not in validated_data:
            validated_data['date'] = timezone.now().date()
        
        if 'lunar_date' not in validated_data:
            solar_date = validated_data['date']
            lunar_date = LunarDate.fromSolarDate(solar_date.year, solar_date.month, solar_date.day)
            validated_data['lunar_date'] = lunar_date.to_date()

        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'date' in validated_data:
            solar_date = validated_data['date']
            lunar_date = LunarDate.fromSolarDate(solar_date.year, solar_date.month, solar_date.day)
            validated_data['lunar_date'] = lunar_date.to_date()
        elif 'lunar_date' not in validated_data:
            validated_data['lunar_date'] = instance.lunar_date

        return super().update(instance, validated_data)