from django.urls import path
from .views import *

urlpatterns = [
    path('categories', ListCategories.as_view()),
    path('<int:category_id>/category', GetCategory.as_view()),
    path('create', NewCategory.as_view()),
    path('<int:id>/update', UpdateCategory.as_view()),
    path('<int:id>/delete', DeleteCategory.as_view()),
]
