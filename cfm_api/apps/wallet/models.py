from django.db import models
from django.db import models
from datetime import date as dateFormat
from apps.user.models import UserAccount
from apps.category.models import Category
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Wallet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    balance = models.DecimalField(max_digits=16, decimal_places=2)
    objects = models.Manager()

    def __str__(self):
        return self.name

    def getSpending(self):
        spendings = Spending.objects.filter(wallet=self)
        return spendings

    def getSavings(self):
        savings = Saving.objects.filter(wallet=self)
        return savings


class Spending(models.Model):
    class Meta:
        verbose_name = 'Spending'
        verbose_name_plural = 'Spendings'
    wallet = models.ForeignKey(
        Wallet, related_name='related_wallets_for_spending', on_delete=models.CASCADE)
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, null=True, blank=True)
    amount = models.IntegerField()
    date = models.DateField(default=dateFormat.today)
    description = models.TextField()
    objects = models.Manager()

    def __str__(self):
        return f"{self.date} - {self.description}"


class Saving(models.Model):
    class Meta:
        verbose_name = 'Saving'
        verbose_name_plural = 'Savings'
    wallet = models.ForeignKey(
        Wallet, related_name='related_wallets_for_savings', on_delete=models.CASCADE)
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, null=True, blank=True)
    amount = models.IntegerField()
    date = models.DateField(default=dateFormat.today)
    description = models.TextField()
    objects = models.Manager()

    def __str__(self):
        return f"{self.date} - {self.category} - {self.description}"
