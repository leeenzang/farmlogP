from rest_framework import serializers

class WeatherInfoSerializer(serializers.Serializer):
    current_weather = serializers.CharField()
    highest_temp = serializers.FloatField()
    lowest_temp = serializers.FloatField()
    date_of_today = serializers.CharField()