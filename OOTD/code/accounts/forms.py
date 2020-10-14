from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.contrib.auth import password_validation
from django import forms

class CustomPasswordChangeForm(PasswordChangeForm):
    new_password1 = forms.CharField(
        label=('새로운 비밀번호'),
        strip=False,
        widget=forms.PasswordInput,
        help_text=password_validation.password_validators_help_text_html(),
    )
    new_password2 = forms.CharField(
        label=('비밀번호 확인'),
        strip=False,
        widget=forms.PasswordInput(attrs={'autofocus': True})
    )

    old_password = forms.CharField(
        label=('기존 비밀번호'),
        strip=False,
        widget=forms.PasswordInput(attrs={'autofocus': True})
    )
