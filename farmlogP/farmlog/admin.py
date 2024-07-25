from django.contrib import admin
from .models import FarmLog

@admin.register(FarmLog)
class FarmLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'lunar_date', 'max_temp', 'min_temp', 'weather', 'content')
    list_filter = ('user', 'date', 'weather')
    search_fields = ('user__username', 'content')