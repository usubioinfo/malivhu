from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('privacyPolicy/', views.privacyPolicy, name='privacyPolicy'),
    path('submit/', views.submit, name='submit'),
    path('help/', views.help, name='help'),
    path('<int:jobId>/', views.results, name='results'),
    path('<int:jobId>/viewNetwork/', views.viewNetwork, name='viewNetwork'),
    path('<int:jobId>/2/<str:protein>/', views.secondaryStructure, name='secondaryStructure'),
    path('<int:jobId>/3/<str:protein>/', views.tertiaryStructure, name='tertiaryStructure'),
    path('<int:jobId>/predict/2/', views.predictSecondary, name='predictSecondary'),
    path('<int:jobId>/predict/3/', views.predictTertiary, name='predictTertiary'),
    path('<int:jobId>/checkProgress/', views.checkProgress, name='checkProgress'),
    path('<int:jobId>/checkProgress3/', views.checkProgress3, name='checkProgress3'),
    path('checkJob/', views.checkJob, name='checkJob'),
    path('checkJob4/', views.checkJob4, name='checkJob4'),
    path('<int:jobId>/submitPhase4/', views.submitPhase4, name='submitPhase4'),
    path('datasets/', views.datasets, name='datasets'),
]