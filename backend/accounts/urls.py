from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from . import views

urlpatterns = [
    path('signup/', views.SignupView.as_view()),
    path("token/", obtain_jwt_token),
    path("token/refresh/", refresh_jwt_token),
    path("token/verify/", verify_jwt_token),
    path("suggestions/", views.SuggestionListAPIView.as_view(), name="suggestion_user_list"),
]
