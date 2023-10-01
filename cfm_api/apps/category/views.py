from .serializer import CategorySerializer
from django.shortcuts import get_object_or_404
from .models import Category
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions


class ListCategories(APIView):
    # permissions.IsAuthenticated,
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        try:
            if Category.objects.all().exists():
                categories = Category.objects.all()
                serilizer = CategorySerializer(categories, many=True)
                return Response({'categories': serilizer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'No categories found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetCategory(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, category_id, format=None):
        try:
            category = get_object_or_404(Category, id=category_id)

            serilizer = CategorySerializer(category)
            return Response({'categories': serilizer.data}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class NewCategory(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        try:
            serializer = CategorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': serializer.data}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UpdateCategory(APIView):
    permission_classes = (permissions.AllowAny, )

    def put(self, request, id):
        try:
            category = get_object_or_404(Category, id=id)
            serializer = CategorySerializer(category, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': serializer.data}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class DeleteCategory(APIView):
    permission_classes = (permissions.AllowAny,)

    def delete(self, request, id, format=None):
        try:
            if Category.objects.filter(id=id).exists():
                category = Category.objects.get(id=id)
                category.delete()
                return Response({'success': 'Category deleted'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'No category found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
