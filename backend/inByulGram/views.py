from datetime import timedelta

from django.db.models import Q
from django.utils import timezone
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from inByulGram.models import Post
from .serializers import PostSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [AllowAny] # FIXME : 인증 적용

    def get_queryset(self):     # 쿼리셋 재정의
        timesince = timezone.now() - timedelta(days=3)
        qs = super().get_queryset()
        qs = qs.filter(
            Q(author=self.request.user) |                           # 내가 쓴 글 or
            Q(author__in=self.request.user.following_set.all())     # 내 팔로워가 쓴 글
        )
        qs = qs.filter(created_at__gte=timesince)       # 3일 이내 업로드 된 글만 호출
        return qs
