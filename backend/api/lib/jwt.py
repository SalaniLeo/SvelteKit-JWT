import jwt
import os

def generate_token(firstname, email):
    return jwt.encode({"name": firstname, "email": email}, os.environ.get('ACCESS_TOKEN_SECRET'), algorithm="HS256")

def validate_token(token, algorithms):
    return jwt.decode(token, os.environ.get('ACCESS_TOKEN_SECRET'), algorithms="HS256")
