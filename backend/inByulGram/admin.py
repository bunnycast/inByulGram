from django.contrib import admin
from django.utils.safestring import mark_safe

from inByulGram.models import Post, Comment, Tag


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['photo_tag', 'caption', ]
    list_display_links = ['caption', ]

    def photo_tag(self, obj):
        return mark_safe(f'<img src="{obj.photo.url}" style="width:100px;" />')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass
