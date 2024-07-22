from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# customuser모델은 기본 제공 관리자 못 써서 따로 설정해야됨
class CustomUserManager(BaseUserManager):
    def create_user(self, userID, password=None, **extra_fields):
        if not userID:
            raise ValueError('The userID field must be set')
        user = self.model(userID=userID, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, userID, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(userID, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    userID = models.CharField(max_length=15, unique = True)
    name = models.CharField(max_length=15)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'userID'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.userID