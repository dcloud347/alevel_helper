from django.db import models


# Create your models here.
class Users(models.Model):
    SEX_ITEMS = (
        (2, '未知'),
        (1, '男'),
        (0, '女'),
    )
    name = models.CharField(max_length=128, verbose_name='姓名')
    sex = models.IntegerField(choices=SEX_ITEMS, default=2, verbose_name='性别')
    idcard = models.CharField(max_length=18, verbose_name='校园卡号码', unique=True)
    email = models.EmailField(verbose_name='邮箱地址')
    created_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    password = models.CharField(max_length=128, verbose_name='密码')
    avatar = models.ImageField(upload_to='avatar', default="default.jpeg")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = verbose_name_plural = '用户管理'


class Files(models.Model):
    SUBJECT_ITEMS = (
        (0, 'Math'),
        (1, 'Further Math'),
        (2, 'Computer Science'),
        (3, 'English'),
        (4, 'Integrated English'),
        (5, 'Physics'),
        (6, 'Biology'),
        (7, 'Chemistry'),
        (8, 'Economics'),
        (9, 'Business'),
        (10, 'Psychology'),
        (11, '语文'),
        (12, '历史'),
        (13, '政治'),
        (14, '地理'),
        (15,'未知')
    )
    PUBLISH_ITEMS=(
        (0,'私密'),
        (1,'公开')
    )
    file = models.FileField(upload_to="file",default="Alevel_helper.docx")
    owner = models.CharField(max_length=18, verbose_name='文件拥有者校园卡号码')
    uploaded_time = models.DateTimeField(auto_now_add=True, verbose_name='上传时间')
    subject = models.IntegerField(choices=SUBJECT_ITEMS, default=15, verbose_name='学科')
    description = models.CharField(max_length=128,verbose_name="文件描述",default = "无描述")
    publish = models.IntegerField(choices=PUBLISH_ITEMS,default = 0,verbose_name = '是否公开')
    '''def __str__(self):
        return self.name'''

    class Meta:
        verbose_name = verbose_name_plural = '文件管理'
