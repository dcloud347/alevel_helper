# Generated by Django 3.2 on 2021-11-04 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermanage', '0015_alter_users_last_logged_in'),
    ]

    operations = [
        migrations.AlterField(
            model_name='files',
            name='file',
            field=models.FileField(default='Alevel_helper.docx', unique=True, upload_to='file'),
        ),
    ]