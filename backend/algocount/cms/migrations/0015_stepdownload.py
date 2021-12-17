# Generated by Django 3.2.8 on 2021-12-16 14:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0014_alter_reference_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='StepDownload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('last_update', models.DateTimeField(auto_now=True)),
                ('title', models.TextField()),
                ('file', models.FileField(upload_to='')),
                ('step', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cms.step')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
