import pytest
from fastapi import HTTPException
from bcrypt import hashpw, checkpw
from core.security import (
    hash_password_func,
    check_password_func,
    token_generator_func,
    get_token_func,
)
import jwt
from core.config import SECRET_CODE, ALGO


def test_hash_password_func():
    hashed1 = hash_password_func("mypassword123")
    hashed2 = hash_password_func("mypassword123")

    assert hashed1 != hashed2


def test_check_password_func():

    hash1 = hash_password_func("fu%02jbfmf0")
    hash2 = hash_password_func("01k33gjs02f0")
    hash3 = hash_password_func("kw9b2$2#10kjs02f0")

    assert check_password_func("fu%02jbfmf0", hash1) == True
    assert check_password_func("01k33gjs02f0", hash2) == True
    assert check_password_func("md92mla02b3h4922id", hash3) == False


def test_token_generator_func():
    email = "ashrafalistudy@gmail.com"
    role = "student"
    token = token_generator_func(email, role)

    assert isinstance(token, str)

    decoded = get_token_func(token)
    assert decoded["email"] == email
    assert decoded["role"] == role
    assert "exp" in decoded


def test_get_token_func():
    email = "ashrafalistudy@gmail.com"
    role = "student"
    token = token_generator_func(email, role)
    assert isinstance(token, str)

    decoded = get_token_func(token)
    another_decoded = jwt.decode(token, SECRET_CODE, algorithms=[ALGO])

    assert another_decoded == decoded
