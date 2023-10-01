from django.urls import path
from .views import *

urlpatterns = [
    path('wallets', WalletList.as_view()),
    path('wallets/user', UserWalletList.as_view()),
    path('wallets/<int:id>', UserWalletDetail.as_view()),
    path('create', NewWallet.as_view()),
    path('<int:id>/update', UpdateWallet.as_view()),
    path('<int:id>/delete', DeleteWallet.as_view()),

    path('<int:wallet_id>/spendings', SpendingList.as_view()),
    path('<int:spending_id>/spending', GetSpending.as_view()),
    path('<int:wallet_id>/<int:category_id>/spendings/create', NewSpending.as_view()),
    path('<int:wallet_id>/spending/<int:id>/<int:category_id>/update', UpdateSpending.as_view()),
    path('<int:wallet_id>/spending/<int:id>/delete', DeleteSpending.as_view()),

    path('<int:wallet_id>/savings', SavingList.as_view()),
    path('<int:saving_id>/saving', GetSaving.as_view()),
    path('<int:wallet_id>/<int:category_id>/savings/create', NewSaving.as_view()),
    path('<int:wallet_id>/saving/<int:id>/<int:category_id>/update', UpdateSaving.as_view()),
    path('<int:wallet_id>/saving/<int:id>/delete', DeleteSaving.as_view()),
]
