from rest_framework import serializers

class WeatherInfoSerializer(serializers.Serializer):
    current_weather = serializers.CharField()
    highest_temp = serializers.CharField()
    lowest_temp = serializers.CharField()
    date_of_today = serializers.CharField()
    precipitation_probability = serializers.CharField()  # 강수확률 필드 추가
    humidity = serializers.CharField()  # 습도 필드 추가