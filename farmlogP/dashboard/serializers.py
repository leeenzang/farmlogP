from rest_framework import serializers

class WeatherInfoSerializer(serializers.Serializer):
    current_weather = serializers.CharField()
    highest_temp = serializers.FloatField()
    lowest_temp = serializers.FloatField()
    date_of_today = serializers.CharField()
    precipitation_probability = serializers.FloatField()  # 강수확률 필드 추가
    humidity = serializers.FloatField()  # 습도 필드 추가