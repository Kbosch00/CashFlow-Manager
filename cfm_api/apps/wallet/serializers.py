from apps.category.models import Category
from .models import Wallet, Saving, Spending
from apps.category.serializer import CategorySerializer
from rest_framework import serializers


class WalletListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['id', 'name', 'balance']


class WalletDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['id', 'user', 'name', 'balance']


class SavingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Saving
        fields = ['id', 'category', 'amount', 'date', 'description']


class SavingListSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Saving
        fields = ['id', 'category', 'amount', 'date', 'description']


class SpendingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Spending
        fields = ['id', 'category', 'amount', 'date', 'description']


class SpendingListSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Spending
        fields = ['id', 'category', 'amount', 'date', 'description']
