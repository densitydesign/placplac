# Generated by Django 3.2.8 on 2021-11-09 08:35

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0003_experiment_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experiment',
            name='tags',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(), blank=True, null=True, size=None),
        ),
    ]
