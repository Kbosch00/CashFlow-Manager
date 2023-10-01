from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    path('admin/', admin.site.urls),
    path('api/category/', include('apps.category.urls')),
    path('api/wallet/', include('apps.wallet.urls')),
]
