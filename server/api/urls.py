from django.urls import path
from api import views
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)

urlpatterns = [
    path('test/', views.greet),
    path('home/',views.home),
    path('query/',views.ask_query),
    path('upload/',views.upload_pdf),
    path('register/',views.register_user),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('details/',views.get_details),
    path('login/',views.login_user),
    path('logout/',views.logout_user),
]
