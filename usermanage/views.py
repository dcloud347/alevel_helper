import json
import os

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from django.forms.models import model_to_dict
from django.db.utils import IntegrityError
from .models import Users, Files

logged_in_Users = []


class UsersView(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super(UsersView, self).dispatch(request, *args, **kwargs)

    def get(self, request, pk=0):
        try:
            user = Users.objects.get(idcard=pk)
            if user.idcard in logged_in_Users:
                user = {"name": user.name, "idcard": user.idcard, "sex": user.sex, "email": user.email,
                        "created_time": user.created_time
                    , "avatar": str(user.avatar),"identity":user.identity}
                return JsonResponse({'code': 200, 'message': '登陆状态', 'data': user}, status=200)
            else:
                user = {"name": user.name, "idcard": user.idcard, "sex": user.sex, "email": user.email,
                        "created_time": user.created_time
                    , "avatar": str(user.avatar),"identity":user.identity}
                return JsonResponse({'code': 200, 'message': '非登陆状态', 'data': user}, status=200)
        except Users.DoesNotExist:
            return JsonResponse({'code': 404, 'message': '用户不存在'}, status=200)

    def post(self, request, pk=0):
        data = json.loads(request.body)
        if pk == 1:
            data = json.loads(request.body)
            try:
                user = Users.objects.get(idcard=data["idcard"])
            except Users.DoesNotExist:
                return JsonResponse({'code': 404, 'message': '用户不存在'}, status=200)
            if user.password == data["password"]:
                logged_in_Users.append(user.idcard)
                user = {"name": user.name, "idcard": user.idcard, "sex": user.sex, "email": user.email,
                        "created_time": user.created_time
                    , "avatar": str(user.avatar)}
                return JsonResponse({'code': 200, 'message': '登陆成功', 'data': user}, status=200)
            else:
                return JsonResponse({'code': 404, 'message': '账号或密码不正确'}, status=200)
        elif pk == 2:
            try:
                user = Users.objects.create(**data)
            except IntegrityError:
                return JsonResponse({'code': 400, 'message': '校园卡号码已存在！'}, status=200)
            user = {"name": user.name, "idcard": user.idcard, "sex": user.sex, "email": user.email,
                    "created_time": user.created_time
                , "avatar": str(user.avatar)}
            return JsonResponse({'code': 201, 'message': 'created', 'data': user}, status=201)

    def put(self, request, pk=0):
        data = json.loads(request.body)
        user = Users.objects.get(idcard=str(pk))
        if data['password_before']==user.password:
            setattr(user,'password',data['password'])
            user.save()
            user = {"name": user.name, "idcard": user.idcard, "sex": user.sex, "email": user.email,
                    "created_time": user.created_time
                , "avatar": str(user.avatar)}
            return JsonResponse({'code': 200, 'message': 'updated', 'data': user}, status=200)
        else:
            return JsonResponse({'code': 403, 'message': '原来的密码错误'}, status=403)



    def delete(self, request, pk=0):
        user = Users.objects.get(idcard=pk)
        file = Files.objects.filter(owner=pk).all()
        for i in list(file.values()):
            os.remove(settings.MEDIA_ROOT + '/file/' + str(pk)+"/"+i["file"])
        os.remove(settings.MEDIA_ROOT + '/avatar/' + str(user.avatar))
        user.delete()
        file.delete()
        return JsonResponse({'code': 204, 'message': 'deleted'}, status=204)


class UserAvatars(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super(UserAvatars, self).dispatch(request, *args, **kwargs)

    def post(self, request, pk=0):
        if str(pk) in logged_in_Users:
            img = request.FILES.get("avatar")
            user = Users.objects.get(idcard=str(pk))
            save_path = '{}/avatar/{}'.format(settings.MEDIA_ROOT,
                                              str(pk) + "." + img.name.split('.')[len(img.name.split('.')) - 1])
            if str(user.avatar) != "default.jpeg":
                os.remove(settings.MEDIA_ROOT + '/avatar/' + str(user.avatar))
            with open(save_path, 'wb') as f:
                for content in img.chunks():
                    f.write(content)
            setattr(user, "avatar", str(pk) + "." + img.name.split('.')[len(img.name.split('.')) - 1])
            user.save()
            user = {"name": user.name, "idcard": user.idcard, "sex": user.sex, "email": user.email,
                    "created_time": user.created_time
                , "avatar": str(user.avatar)}
            return JsonResponse({'code': 200, 'message': 'updated', 'data': user}, status=200)
        else:
            return JsonResponse({'code': 403, 'message': '请先登录'}, status=403)


class UserFiles(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super(UserFiles, self).dispatch(request, *args, **kwargs)

    def get(self, request, pk=0, subject=-1):
        if pk:
            if str(pk) in logged_in_Users:
                file = list(Files.objects.filter(owner=pk).all().values())
                return JsonResponse({'code': 200, 'message': 'success', 'data': file}, status=200)
            else:
                return JsonResponse({'code': 403, 'message': '请先登录'}, status=403)
        else:
            if subject != -1:
                file = list(Files.objects.filter(publish=1, subject=subject).all().values())
            else:
                file = list(Files.objects.filter(publish=1).all().values())
            return JsonResponse({'code': 200, 'message': 'success', 'data': file}, status=200)

    def post(self, request, pk=0, subject=15, description=""):
        if str(pk) in logged_in_Users:
            files = request.FILES.get("file")
            save_path = '{}/file/{}/{}'.format(settings.MEDIA_ROOT, str(pk), files.name)
            try:
                with open(save_path, 'wb') as f:
                    for content in files.chunks():
                        f.write(content)
            except FileNotFoundError:
                os.mkdir('{}/file/{}'.format(settings.MEDIA_ROOT, str(pk)))
                with open(save_path, 'wb') as f:
                    for content in files.chunks():
                        f.write(content)
            try:
                file = Files.objects.create(file=files.name, owner=str(pk), subject=subject, description=description)
                file.save()
            except IntegrityError:
                return JsonResponse({'code': 400, 'message': '文件名已存在！'}, status=200)
            user_own = list(Files.objects.filter(owner=pk).all().values())
            return JsonResponse({'code': 200, 'message': 'updated', 'data': user_own}, status=200)
        else:
            return JsonResponse({'code': 403, 'message': '请先登录'}, status=403)

    def put(self, request, pk=0):
        data = json.loads(request.body)
        try:
            file = Files.objects.get(pk=pk)
        except Files.DoesNotExist:
            return JsonResponse({'code': 404, 'message': '要修改的文件不存在'}, status=200)
        if file.owner in logged_in_Users:
            for key, value in data.items():
                setattr(file, key, value)
            file.save()
            user_own = list(Files.objects.filter(owner=pk).all().values())
        else:
            return JsonResponse({'code': 403, 'message': '请先登录'}, status=403)
        return JsonResponse({'code': 200, 'message': 'updated', 'data': user_own}, status=200)

    def delete(self, request, pk=0):
        try:
            file = Files.objects.get(pk=pk)
            if file.owner in logged_in_Users:
                os.remove(settings.MEDIA_ROOT + '/file/' + file.owner + "/" + str(file.file))
                file.delete()
            else:
                return JsonResponse({'code': 403, 'message': '请先登录'}, status=403)
        except Files.DoesNotExist:
            return JsonResponse({'code': 404, 'message': '文件不存在'}, status=200)
        return JsonResponse({'code': 204, 'message': 'deleted'}, status=204)
