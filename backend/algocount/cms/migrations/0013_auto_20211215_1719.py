# Generated by Django 3.2.8 on 2021-12-15 16:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0012_auto_20211215_1429'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reference',
            old_name='title',
            new_name='description',
        ),
        migrations.RemoveField(
            model_name='reference',
            name='link',
        ),
        migrations.AddField(
            model_name='reference',
            name='experiment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cms.experiment'),
        ),
        migrations.AlterField(
            model_name='reference',
            name='project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cms.project'),
        ),
    ]