# Generated by Django 4.2.4 on 2023-08-29 07:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0001_initial'),
        ('wallet', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Savings',
            new_name='Saving',
        ),
        migrations.RenameModel(
            old_name='Expense',
            new_name='Spending',
        ),
        migrations.AlterModelOptions(
            name='saving',
            options={'verbose_name': 'Saving', 'verbose_name_plural': 'Savings'},
        ),
        migrations.AlterModelOptions(
            name='spending',
            options={'verbose_name': 'Spending', 'verbose_name_plural': 'Spendings'},
        ),
    ]