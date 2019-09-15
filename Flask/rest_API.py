#from lib2to3.refactor import _identity

from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
import hashlib
from datetime import datetime

from model import User, FreeBoard, Notice, About, Event, Info, Code

'''
flask_jwt_extended 모듈의 create_access_token을 이용하여 token을 정하려면
고유한 Token Identity를 정해야만 한다! => userId
'''


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
        if User.query.filter(User.userId == data['userId']).first():
            return {"error": "같은 ID의 User가 존재합니다."}
        #if Should_Confirm_User.query.filter(Should_Confirm_User.userId == data['userId']).first():
        #    return {'error': '승인 대기중입니다.'}

        u = User(userId=data['userId'],
                 password=hashlib.md5(data['password'].encode()).hexdigest(),
                 role="User", #또는 Admin
                 username=data['username'],
                 studentId=data['studentId'],
                 phonenumber=data['phonenumber'],
                 major=data['major'],
                 sex=data['sex'],
                 birth=data['birth'])
        u.save()  # Database 안에 document 저장

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


'''
# Maintainer 유저가 confirm해주면 진짜 User가 됨!
class UserApproval(Resource):
    def post(self):
        # try:
        parser = reqparse.RequestParser()
        parser.add_argument('userId')

        data = parser.parse_args()
        # print(data)
        confirm_current_user = Should_Confirm_User.query.filter(Should_Confirm_User.userId == data['userId']).first()

        if not confirm_current_user:
            return {"error": "등록된 ID가 없습니다."}
        if User.query.filter(User.userId == data['userId']).first():
            return {"error": "같은 ID의 User가 존재합니다."}

        u = User(userId=confirm_current_user.userId,
                 password=confirm_current_user.password,
                 role=confirm_current_user.role,
                 username=confirm_current_user.username,
                 studentId=confirm_current_user.studentId)
        u.save()  # Database 안에 document 저장

        confirm_current_user.remove()

        return {"message": "성공적으로 " + data['userId'] + "를 추가했습니다."}


class UserRejection(Resource):
    def post(self):
        # try:
        parser = reqparse.RequestParser()
        parser.add_argument('userId')

        data = parser.parse_args()
        # print(data)
        confirm_current_user = Should_Confirm_User.query.filter(Should_Confirm_User.userId == data['userId']).first()

        if not confirm_current_user:
            return {"error": "등록된 ID가 없습니다."}

        confirm_current_user.remove()

        return {"message": "성공적으로 " + data['userId'] + "의 승인을 거부했습니다."}


class UserRemoval(Resource):
    def post(self):
        # try:
        parser = reqparse.RequestParser()
        parser.add_argument('userId')

        data = parser.parse_args()
        # print(data)
        current_user = User.query.filter(User.userId == data['userId']).first()

        if not current_user:
            return {"error": "등록된 ID가 없습니다."}

        current_user.remove()

        return {"message": "성공적으로 " + data['userId'] + "을 삭제했습니다."}


# Maintainer 페이지에서 보일 user list를 위한 API
class UserList(Resource):
    def get(self):
        # try:
        should_confirm_user = Should_Confirm_User.query.all()
        user = User.query.all()

        should_confirm_user_list = []
        for user_content in should_confirm_user:
            if user_content is not None:
                temp = {
                    "userId": user_content.userId,
                    "password": user_content.password,
                    "role": user_content.role,
                    "username": user_content.username,
                    "studentId": user_content.studentId
                }
                should_confirm_user_list.append(temp)

        user_list = []
        for user_content in user:
            if user_content is not None:
                temp = {
                    "userId": user_content.userId,
                    "password": user_content.password,
                    "role": user_content.role,
                    "username": user_content.username,
                    "studentId": user_content.studentId
                }
                user_list.append(temp)

        return {
            "should_confirm_user": should_confirm_user_list,
            "user": user_list
        }
'''

class UserLogin(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('userId')
            parser.add_argument('password')

            data = parser.parse_args()
            current_user = User.query.filter(User.userId == data['userId']).first()

            # 없는 아이디일 때!
            if not current_user:
                return {"error": "등록된 ID가 없습니다."}

            password = hashlib.md5(data['password'].encode()).hexdigest()  # password 암호화

            if current_user.password == password:
                access_token = create_access_token(identity=data['userId'])
                refresh_token = create_refresh_token(identity=data['userId'])
                return {
                    'username': current_user.username,
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'role': current_user.role,
                    'userId' : current_user.userId
                }
            else:
                # 비밀번호 틀린 경우
                return {'error': '등록된 ID가 없습니다.'}
        except:
            raise Exception("로그인할 수 없습니다.")


class insertFreeBoard(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('title')
            parser.add_argument('content')
            parser.add_argument('username')

            data = parser.parse_args()

            title = data['title']
            content = data['content']
            id = 1 # 이거 나중에 맨 마지막 글 아이디 찾아서 바꿔줘야함!
            date = datetime.now()
            date = str(date.year) + "-" + str(date.month) + "-" + str(date.day) + " " + str(date.hour) + ":" + str(date.minute) + ":" + str(date.second)
            #print(date)
            views = 0
            likes = 0
            writer = data['username']
            reply = [""]

            f = FreeBoard(title = title,
                          content = content,
                          id = id,
                          date = date,
                          views = views,
                          likes = likes,
                          writer = writer,
                          reply = reply)
            f.save()  # Database 안에 document 저장

            return {
                "message" : "글 작성에 성공했습니다."
            }

        except:
            raise Exception("글 작성에 실패했습니다.")


class insertEvent(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()

            parser.add_argument('start')
            parser.add_argument('end')
            parser.add_argument('title')
            parser.add_argument('writer')

            data = parser.parse_args()

            start = data['start']
            end = data['end']
            title = data['title']



            E = Event(
                start=start,
                end=end,
                title=title
            )

            E.save()  # Database 안에 document 저장

            return {
                "message": "일정 작성에 성공했습니다."
            }


        except:
            raise Exception("일정 작성에 실패했습니다.")









class insertNotice(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('title')
            parser.add_argument('content')
            parser.add_argument('username')

            data = parser.parse_args()

            title = data['title']
            content = data['content']
            id = 2  # 이거 나중에 맨 마지막 글 아이디 찾아서 바꿔줘야함!
            date = datetime.now()
            date = str(date.year) + "-" + str(date.month) + "-" + str(date.day) + " " + str(
                date.hour) + ":" + str(date.minute) + ":" + str(date.second)
            # print(date)
            views = 0
            likes = 0
            writer = data['username']
            reply = [""]

            n = Notice(title=title,
                       content=content,
                       id=id,
                       date=date,
                       views=views,
                       likes=likes,
                       writer=writer,
                       reply=reply)
            n.save()  # Database 안에 document 저장

            return {
                "message": "글 작성에 성공했습니다."
            }

        except:
            raise Exception("글 작성에 실패했습니다.")

class insertInfo(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('title')
            parser.add_argument('content')
            parser.add_argument('username')

            data = parser.parse_args()

            title = data['title']
            content = data['content']
            id = 2  # 이거 나중에 맨 마지막 글 아이디 찾아서 바꿔줘야함!
            date = datetime.now()
            date = str(date.year) + "-" + str(date.month) + "-" + str(date.day) + " " + str(
                date.hour) + ":" + str(date.minute) + ":" + str(date.second)
            # print(date)
            views = 0
            likes = 0
            writer = data['username']
            reply = [""]

            i = Info(title=title,
                       content=content,
                       id=id,
                       date=date,
                       views=views,
                       likes=likes,
                       writer=writer,
                       reply=reply)
            i.save()  # Database 안에 document 저장

            return {
                "message": "글 작성에 성공했습니다."
            }

        except:
            raise Exception("글 작성에 실패했습니다.")


class insertCode(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('title')
            parser.add_argument('content')
            parser.add_argument('username')

            data = parser.parse_args()

            title = data['title']
            content = data['content']
            id = 2  # 이거 나중에 맨 마지막 글 아이디 찾아서 바꿔줘야함!
            date = datetime.now()
            date = str(date.year) + "-" + str(date.month) + "-" + str(date.day) + " " + str(
                date.hour) + ":" + str(date.minute) + ":" + str(date.second)
            # print(date)
            views = 0
            likes = 0
            writer = data['username']
            reply = [""]

            c = Code(title=title,
                       content=content,
                       id=id,
                       date=date,
                       views=views,
                       likes=likes,
                       writer=writer,
                       reply=reply)
            c.save()  # Database 안에 document 저장

            return {
                "message": "글 작성에 성공했습니다."
            }

        except:
            raise Exception("글 작성에 실패했습니다.")


class getFreeBoard(Resource):
    def get(self):
        freeboard = FreeBoard.query.all()

        result = []
        for text in freeboard:
            temp = {
                "title" : text.title,
                "content" : text.content,
                "id" : text.id,
                "date" : text.date,
                "views" : text.views,
                "likes" : text.likes,
                "writer" : text.writer,
                "reply" : text.reply
            }
            result.append(temp)

        return { "result" : result }

class getNotice(Resource):
    def get(self):
        notice = Notice.query.all()

        result = []
        for text in notice:
            temp = {
                "title": text.title,
                "content": text.content,
                "id": text.id,
                "date": text.date,
                "views": text.views,
                "likes": text.likes,
                "writer": text.writer,
                "reply": text.reply
            }
            result.append(temp)

        Notice.query.find_and_modify()

        return {"result": result}


class getCode(Resource):
    def get(self):
        code = Code.query.all()

        result = []
        for text in code:
            temp = {
                "title": text.title,
                "content": text.content,
                "id": text.id,
                "date": text.date,
                "views": text.views,
                "likes": text.likes,
                "writer": text.writer,
                "reply": text.reply
            }
            result.append(temp)

        return {"result": result}


class getInfo(Resource):
    def get(self):
        info = Info.query.all()

        result = []
        for text in info:
            temp = {
                "title": text.title,
                "content": text.content,
                "id": text.id,
                "date": text.date,
                "views": text.views,
                "likes": text.likes,
                "writer": text.writer,
                "reply": text.reply
            }
            result.append(temp)

        return {"result": result}

class getAbout(Resource):
    def get(self):
        about = About.query.all()

        result = []
        for content in about:
            temp = {
                "text" : content.text,
                "date" : content.date,
                "writer" : content.writer
            }
            result.append(temp)
        return {"result" : result}


class getEvent(Resource):
    def get(selfs):
        event = Event.query.all()

        result = []

        for function in event:
            temp = {
                "start" : function.start,
                "end" : function.end,
                "title" : function.title

            }
            result.append(temp)
        return {"result" : result}


class updateAbout(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('role')
            parser.add_argument('text')
            parser.add_argument('writer')

            data = parser.parse_args()

            if data['role'] == 'Admin':
                prev_about = About.query.first()
                prev_about.remove()

                date = datetime.now()
                date = str(date.year) + "-" + str(date.month) + "-" + str(date.day) + " " + str(date.hour) + ":" + str(date.minute) + ":" + str(date.second)

                new_about = About(
                    text = data['text'],
                    writer = data['writer'],
                    date = date
                )
                new_about.save()
                return {
                    "message" : "About 수정에 성공했습니다."
                }
            else:
                {"error" : "접근 권한이 없습니다."}
        except:
            raise Exception("글 작성에 실패했습니다.")