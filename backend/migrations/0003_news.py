# Generated by Django 3.1.1 on 2020-10-14 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20201014_1351'),
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source', models.CharField(max_length=100)),
                ('news_url', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=30)),
                ('media', models.CharField(max_length=50)),
                ('tags', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=60)),
                ('news_id', models.CharField(max_length=50)),
                ('pub_data', models.CharField(max_length=100)),
                ('content', models.CharField(max_length=10000)),
                ('video', models.CharField(max_length=100)),
            ],
        ),
    ]
