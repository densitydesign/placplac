# Generated by Django 3.2.8 on 2021-12-15 09:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0010_auto_20211214_1452'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reference',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('last_update', models.DateTimeField(auto_now=True)),
                ('title', models.TextField()),
                ('authors', models.TextField()),
                ('source', models.TextField()),
                ('link', models.TextField(blank=True, null=True)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cms.project')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
