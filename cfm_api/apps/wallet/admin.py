from django.contrib import admin

from .models import *


class WalletsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user',
                    'name',
                    'balance',)
    list_display_links = ('user', 'name',)
    list_per_page = 25


admin.site.register(Wallet, WalletsAdmin)


class SpendingAdmin(admin.ModelAdmin):
    list_display = ('wallet',
                    'category',
                    'amount',
                    'date',
                    'description',)
    list_display_links = ('description', 'wallet',)
    list_per_page = 25


admin.site.register(Spending, SpendingAdmin)


class SavingAdmin(admin.ModelAdmin):
    list_display = ('wallet',
                    'category',
                    'amount',
                    'date',
                    'description',)
    list_display_links = ('description', 'wallet',)
    list_per_page = 25


admin.site.register(Saving, SavingAdmin)
