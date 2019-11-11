from flask_restful import Resource, reqparse
from datetime import datetime

from db import db

class insertTutorial(Resource):
    def post(self):
        # try:
            parser = reqparse.RequestParser()
            parser.add_argument('title')
            parser.add_argument('content')
            parser.add_argument('username')
            parser.add_argument('role')

            data = parser.parse_args()

            # print(data['role'])
            if data['role'] == "Admin" or data['role'] == "Executive":

                title = data['title']
                content = data['content']

                current_Tutorial = db.Tutorial.find()
                if current_Tutorial is None:
                    return {"error" : "글 작성에 실패했습니다."}

                last_id = 1
                for doc in current_Tutorial:
                    if doc is not None:
                        temp = doc['_id']
                        if last_id < temp:
                            last_id = temp
                _id = last_id + 1

                date = datetime.now()
                date = str(date.year) + "-" + str(date.month) + "-" + str(date.day) + " " + str(
                    date.hour) + ":" + str(date.minute) + ":" + str(date.second)
                # print(date)
                views = 0
                likes = 0
                writer = data['username']
                reply = []

                n = {
                    "title" : title,
                    "content" : content,
                    "_id" : _id,
                    "date" : date,
                    "views" : views,
                    "likes" : likes,
                    "writer" : writer,
                    "reply" : reply
                }
                db.Tutorial.insert(n)  # Database 안에 document 저장

                return {
                    "message": "글 작성에 성공했습니다."
                }

            else:
                return {"error" : "접근 권한이 없습니다."}

        # except:
        #     raise Exception("글 작성에 실패했습니다.")


class getTutorial(Resource):
    def get(self):
        tutorial = db.Tutorial.find()

        if tutorial is None:
            return {"error" : "데이터가 없습니다."}

        result = []
        for text in tutorial:
            if text is not None:
                temp = {
                    "title": text['title'],
                    "content": text['content'],
                    "_id": text['_id'],
                    "date": text['date'],
                    "views": text['views'],
                    "likes": text['likes'],
                    "writer": text['writer'],
                    "reply": text['reply']
                }
                result.append(temp)

        result = sorted(result, key=lambda result: (result['_id']))

        return {"result": result}