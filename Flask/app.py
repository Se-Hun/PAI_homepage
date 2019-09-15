from flask import Flask, jsonify

from flask_restful import Api
from flask_jwt_extended import JWTManager
# 플라스크는 JWT 인증이라는걸 쓴다. 즉, flask에서는 flask_jwt_extended라는 모듈을 이용하여 token을 처리한다.
from flask_cors import CORS

from model import User, db
# import rest_API
import User_Manager
import FreeBoard_Manager
import Notice_Manager

import About_Manager

app = Flask(__name__)
CORS(app)
api = Api(app)
app.config['JWT_SECRET_KEY'] = 'PAI-sehun'
jwt=JWTManager(app)

api.add_resource(User_Manager.UserRegistration, '/register')
api.add_resource(User_Manager.UserLogin, '/login')

api.add_resource(About_Manager.getAbout, '/about')
api.add_resource(About_Manager.updateAbout, '/about/admin/update')

api.add_resource(FreeBoard_Manager.insertFreeBoard, '/user/insert/freeboard')
api.add_resource(FreeBoard_Manager.getFreeBoard, '/user/get/freeboard')

api.add_resource(Notice_Manager.insertNotice, '/user/insert/notice')
api.add_resource(Notice_Manager.getNotice, '/user/get/notice')

# api.add_resource(rest_API.insertInfo, '/user/insert/info')
# api.add_resource(rest_API.getInfo, '/user/get/info')


# api.add_resource(rest_API.insertCode, '/user/insert/code')
# api.add_resource(rest_API.getCode, '/user/get/code')

# api.add_resource(rest_API.insertEvent, '/user/insert/event')
# api.add_resource(rest_API.getEvent, '/user/get/event')

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
    #app.run(host='0.0.0.0')