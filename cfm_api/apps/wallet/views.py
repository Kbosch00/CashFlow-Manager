from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from .models import *
from .serializers import *

# WalletAPI


class WalletList(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        try:
            wallets = Wallet.objects.all()
            if wallets.exists():
                serializer = WalletListSerializer(wallets, many=True)
                return Response({'wallets': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'No wallets found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserWalletList(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user_ = self.request.user
        try:
            wallets = Wallet.objects.filter(user=user_)
            if wallets.exists():
                serializer = WalletListSerializer(wallets, many=True)
                return Response({'wallets': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'No wallets found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserWalletDetail(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, id, format=None):
        try:
            wallet = get_object_or_404(Wallet, id=id)
            serializer = WalletListSerializer(wallet)
            return Response({'wallets': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class NewWallet(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        user_ = self.request.user
        wallet = request.data
        serializer = WalletListSerializer(data=wallet)
        if serializer.is_valid():
            try:
                wallet_data = serializer.validated_data
                wallet = Wallet(user=user_, **wallet_data)
                wallet.save()
                return Response(status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateWallet(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def patch(self, request, id, format=None):
        data = request.data
        try:
            wallet = get_object_or_404(Wallet, id=id)
            serializer = WalletListSerializer(wallet, data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': serializer.data}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class DeleteWallet(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, id, Format=None):
        try:
            if Wallet.objects.filter(id=id).exists():
                wallet = Wallet.objects.get(id=id)
                wallet.delete()
                return Response({'success': 'wallet deleted'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'No wallet found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# SpendingAPI
class SpendingList(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, wallet_id, format=None):
        try:
            wallet_ = Wallet.objects.get(id=wallet_id)
            if Spending.objects.filter(wallet=wallet_).exists():
                spending = Spending.objects.filter(wallet=wallet_)
                serializer = SpendingListSerializer(spending, many=True)
                return Response({'spending': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'No spendings found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class NewSpending(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, wallet_id, category_id, sformat=None):
        try:
            wallet_ = Wallet.objects.get(id=wallet_id)
            category_ = Category.objects.get(id=category_id)
            spending_data = request.data
            serializer = SpendingSerializer(data=spending_data)
            if serializer.is_valid():
                spending = Spending(
                    wallet=wallet_, category=category_, **spending_data)
                wallet_.balance -= spending_data['amount']
                wallet_.save()
                spending.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetSpending(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, spending_id, formt=None):
        try:
            spending_ = get_object_or_404(Spending, id=spending_id)
            serializer = SpendingSerializer(spending_)
            return Response({'spending': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UpdateSpending(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, id, wallet_id, category_id):
        try:
            wallet_ = Wallet.objects.get(id=wallet_id)
            spending = get_object_or_404(Spending, id=id)
            category_ = Category.objects.get(id=category_id)
            data = request.data
            if (data['amount']):
                if not (data['amount'] == 'undefined'):
                    if spending.amount < data['amount']:
                        value = data['amount'] - spending.amount
                        wallet_.balance -= value
                        wallet_.save()
                    if spending.amount > data['amount']:
                        value = spending.amount - data['amount']
                        wallet_.balance += value
                        wallet_.save()
                    spending.amount = data['amount']
                    spending.save()
            if (data['date']):
                if not (data['date'] == 'undefined'):
                    spending.date = data['date']
                    spending.save()
            if (data['description']):
                if not (data['description'] == 'undefined'):
                    spending.description = data['description']
                    spending.save()
            spending.category = category_
            spending.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class DeleteSpending(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, id, wallet_id, Format=None):
        try:
            if Spending.objects.filter(id=id).exists():
                spending = Spending.objects.get(id=id)
                wallet_ = Wallet.objects.get(id=wallet_id)
                wallet_.balance += spending.amount
                wallet_.save()
                spending.delete()
                return Response({'success': 'spending deleted'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'No spending found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# SavingAPI
class SavingList(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, wallet_id, format=None):
        try:
            wallet_ = Wallet.objects.get(id=wallet_id)
            if Saving.objects.filter(wallet=wallet_).exists():
                savings = Saving.objects.filter(wallet=wallet_)
                serializer = SavingListSerializer(savings, many=True)
                return Response({'savings': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'No savings found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetSaving(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, saving_id, formt=None):
        try:
            saving_ = get_object_or_404(Saving, id=saving_id)
            serializer = SavingSerializer(saving_)
            return Response({'savings': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class NewSaving(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, wallet_id, category_id, format=None):
        try:
            wallet_ = Wallet.objects.get(id=wallet_id)
            saving_data = request.data
            category_ = Category.objects.get(id=category_id)
            serializer = SavingSerializer(data=saving_data)
            if serializer.is_valid():
                saving = Saving(
                    wallet=wallet_, category=category_,  **saving_data)
                wallet_.balance -= saving_data['amount']
                wallet_.save()
                saving.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UpdateSaving(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, id, wallet_id, category_id):
        try:
            wallet_ = Wallet.objects.get(id=wallet_id)
            saving = get_object_or_404(Saving, id=id)
            category_ = Category.objects.get(id=category_id)
            data = request.data
            if (data['amount']):
                if not (data['amount'] == 'undefined'):
                    if saving.amount < data['amount']:
                        value = data['amount'] - saving.amount
                        wallet_.balance -= value
                        wallet_.save()
                    if saving.amount > data['amount']:
                        value = saving.amount - data['amount']
                        wallet_.balance += value
                        wallet_.save()
                    saving.amount = data['amount']
                    saving.save()
            if (data['date']):
                if not (data['date'] == 'undefined'):
                    saving.date = data['date']
                    saving.save()
            if (data['description']):
                if not (data['description'] == 'undefined'):
                    saving.description = data['description']
                    saving.save()
            saving.category = category_
            saving.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class DeleteSaving(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, id, wallet_id, Format=None):
        try:
            if Saving.objects.filter(id=id).exists():
                saving = Saving.objects.get(id=id)
                wallet_ = Wallet.objects.get(id=wallet_id)
                wallet_.balance += saving.amount
                wallet_.save()
                saving.delete()
                return Response({'success': 'saving deleted'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'No saving found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
