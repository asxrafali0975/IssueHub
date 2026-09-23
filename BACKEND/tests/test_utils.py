import pytest
from fastapi import HTTPException
from services.utils import validate_password , generate_otp , role_gen_func , redis_set_func , cookie_set


def test_short_password():
    with pytest.raises(HTTPException , match="Password should be minimum of 8 characters"):
        validate_password("#j8ka")
    with pytest.raises(HTTPException , match="Password should be minimum of 8 characters"):
        validate_password("#9998")


def test_password_without_number():
    with pytest.raises(HTTPException , match="Password must contain at least one number"):
        validate_password("#bdakloie")
    with pytest.raises(HTTPException , match="Password must contain at least one number"):
        validate_password("#kaijsbemi")
    

def test_validate_password():
    assert validate_password("ashraf@9935") == None
    assert validate_password("sumaiya@9935") == None



def test_generate_otp_range():
    otp = generate_otp()
    assert 111111 <=otp <=999999

def test_generate_otp_is_int():
    otp = generate_otp()
    assert isinstance(otp , int)



def test_role_gen():
    assert role_gen_func("test@gmail.com")=="student"
    assert role_gen_func("2024bca@axiscolleges.in")=="student"




def test_redis_set_func(mocker):
    mock_redis = mocker.patch("services.utils._redis")
    data = {"otp": "123456", "token": "abc","name":"testing123"}
    redis_set_func("testing123@gmail.com" , 500 , data= data)

    mock_redis.set.assert_any_call("otp:testing123@gmail.com", "123456", ex=500)


def test_cookie_set(mocker):
    mock_resp = mocker.MagicMock()
    cookie_set(mock_resp, "session_id", "abc123", 3600)

    mock_resp.set_cookie.assert_called_once_with(
        key="session_id",
        value="abc123",
        httponly=True,
        secure=True,
        samesite="none",
        max_age=3600,
    )
    

    
    



