from flask import Flask, jsonify

from flask_restful import Api
from flask_jwt_extended import JWTManager
# 플라스크는 JWT 인증이라는걸 쓴다. 즉, flask에서는 flask_jwt_extended라는 모듈을 이용하여 token을 처리한다.
from flask_cors import CORS

from model import User, db
import rest_API

app = Flask(__name__)
CORS(app)
api = Api(app)
app.config['JWT_SECRET_KEY'] = 'PAI-sehun'
jwt=JWTManager(app)

api.add_resource(rest_API.UserRegistration, '/register')
api.add_resource(rest_API.UserLogin, '/login')
api.add_resource(rest_API.insertFreeBoard, '/user/insert/freeboard')
api.add_resource(rest_API.getFreeBoard, '/user/get/freeboard')
'''
api.add_resource(rest_API.UserApproval, '/user/approval')
api.add_resource(rest_API.UserRejection, '/user/reject')
api.add_resource(rest_API.UserRemoval, '/user/remove')
api.add_resource(rest_API.UserList, '/user/list')
'''

@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
