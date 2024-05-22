from flask import Flask, request, Response, make_response, redirect
from flask_cors import CORS
from .config import load_config
from .connect import connect
from .lib.jwt import *
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv

keepalive_kwargs = {
    "keepalives": 1,
    "keepalives_idle": 30,
    "keepalives_interval": 5,
    "keepalives_count": 5,
}

app = Flask(__name__)
CORS(app)
config = load_config()
conn = connect(config)
cur = conn.cursor()
bcrypt = Bcrypt(app)
load_dotenv()

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/api/login', methods = ['POST'])
def login():
    respone = Database.check_user(request.json.get('email'), request.json.get('password'))
    return respone

@app.route('/api/register', methods = ['POST'])
def register():
    response = Database.register_user(request.json.get('firstname'),request.json.get('lastname'),request.json.get('email'),request.json.get('password'))
    return response

@app.route('/api/authenticate', methods = ['POST'])
def authenticate():
    valid_token = validate_token(request.json.get('accessToken'), algorithms=["HS256"])
    response_data = {
        "response": "Ok",
        "status": 200,
            "user": {
            "token": valid_token
            }
    }
    return response_data, 200

class Database():
    def check_user(email, password):
        cur.execute('SELECT * FROM users WHERE email = %s', (email,))
        row = cur.fetchone()
        if row is not None:
            user_id, firstname, lastname, email, stored_password, date = row
            password_match = bcrypt.check_password_hash(stored_password, password)
            if password_match:
                encoded_jwt = generate_token(firstname, email)

                response_data = {
                    "response": "Ok",
                    "status": 200,
                    "user": {
                        "token": encoded_jwt
                    }
                }
                # Return JSON response
                return response_data, 200
            else:
                # Incorrect password
                return Response("Wrong username or password", status=401)
        else:
            # User not found
            return Response("User not found", status=400)
    
    def register_user(firstname, lastname, email, password):
        try:
            hashed_password = bcrypt.generate_password_hash(password, 10).decode('utf-8')
            cur.execute("INSERT INTO users (username, lastname, email, password) VALUES (%s, %s, %s, %s)", (firstname, lastname, email, hashed_password))
            conn.commit()

            encoded_jwt = generate_token(firstname, email)

            response_data = {
                "response": "User registered successfully",
                "status": 200,
                "user": {
                    "token": encoded_jwt
                }
            }

            return response_data, 200

        except Exception as e:
            
            error_message = str(e)
            if "duplicate key" in error_message.lower():
                response_data = {
                    "response": "Email already in use",
                    "status": 401
                }
                return response_data, 401

            else:
                response_data = {
                    "response": error_message,
                    "status": 500
                }
                return response_data, 500

def run():
    app.run(debug=True, host="0.0.0.0")