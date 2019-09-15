from flask_restful import Resource, reqparse
from flask_jwt_extended import create_refresh_token, create_access_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt
import hashlib

from db import db

class UserRegistration(Resource):
    def post(self):
        # try:
        parser = reqparse.RequestParser()
        parser.add_argument('userId')
        parser.add_argument('password')
        #parser.add_argument('role')
        parser.add_argument('username')
        parser.add_argument('studentId')
        parser.add_argument('phonenumber')
        parser.add_argument('major')
        parser.add_argument('sex')
        parser.add_argument('birth')

        data = parser.parse_args()

        # print(hashlib.md5(data['password'].encode()).hexdigest()) # password 암호화

        # 동일한 userId가 있는 경우, 회원가입 실패!
        if db.User.find_one({"userId" : data['userId']}):
            return {"error": "같은 ID의 User가 존재합니다."}
        #if Should_Confirm_User.query.filter(Should_Confirm_User.userId == data['userId']).first():
        #    return {'error': '승인 대기중입니다.'}

        u = {
            "userId" : data['userId'],
            "password" : hashlib.md5(data['password'].encode()).hexdigest(),
            "role" : "User", #또는 Admin
            "username" : data['username'],
            "studentId" : data['studentId'],
            "phonenumber" : data['phonenumber'],
            "major" : data['major'],
            "sex" : data['sex'],
            "birth" : data['birth']
        }
        db.User.insert(u)  # Database 안에 document 저장

        access_token = create_access_token(identity = data['userId'])
        refresh_token = create_refresh_token(identity = data['userId'])
        return {
            'username': data['username'],
            'access_token': access_token,
            'refresh_token': refresh_token,
            'role': "User",
            'userId' : data['userId']
        }
    # except:
    #   raise Exception()

class UserLogin(Resource):
    def post(self):
        #try:
            parser = reqparse.RequestParser()
            parser.add_argument('userId')
            parser.add_argument('password')

            data = parser.parse_args()
            current_user = db.User.find_one({"userId" : data['userId']})

            # 없는 아이디일 때!
            if not current_user:
                return {"error": "ID나 Password가 틀렸습니다."}

            password = hashlib.md5(data['password'].encode()).hexdigest()  # password 암호화

            if current_user['password'] == password:
                access_token = create_access_token(identity=data['userId'])
                refresh_token = create_refresh_token(identity=data['userId'])
                return {
                    'username': current_user['username'],
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'role': current_user['role'],
                    'userId' : current_user['userId']
                }
            else:
                # 비밀번호 틀린 경우
                return {'error': 'ID나 Password가 틀렸습니다.'}
        #except:
        #    raise Exception("로그인할 수 없습니다.")
