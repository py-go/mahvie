# Generated by Django 3.1.4 on 2021-01-08 13:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AgeRange',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('age', models.CharField(max_length=100, unique=True, verbose_name='Age Range')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CoverageRange',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('coverage', models.CharField(max_length=255, unique=True, verbose_name='Coverage Range')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PremiumRange',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('gender', models.CharField(choices=[('F', 'Male'), ('M', 'Female')], default='M', max_length=1)),
                ('premium_range', models.CharField(max_length=255, verbose_name='Premium Range')),
                ('age_range', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api_v1.agerange', verbose_name='Age Range')),
                ('coverage_range', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api_v1.coveragerange', verbose_name='Coverage Range')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
