from flask_restful import Resource, reqparse
from datetime import datetime

from db import db

class insertFreeBoard(Resource):
    def post(self):
        # try:
            parser = reqparse.RequestParser()
            parser.add_argument('title')
            parser.add_argument('content')
            parser.add_argument('username')

            data = parser.parse_args()

            title = data['title']
            content = data['content']

            current_freeboard = db.FreeBoard.find()
            last_id = 1
            for doc in current_freeboard:
                if doc is not None:
                    temp = doc['_id']
                    if last_id < temp:
                        last_id = temp
            _id = last_id + 1
            # print(_id)

            date = datetime.now()
            date = str(date.year) + "-" + str(date.month) + "-" + str(date.day) + " " + str(date.hour) + ":" + str(date.minute) + ":" + str(date.second)
            #print(date)
            views = 0
            likes = 0
            writer = data['username']
            reply = []

            f = {
                "title" : title,
                "content" : content,
                "_id" : _id,
                "date" : date,
                "views" : views,
                "likes" : likes,
                "writer" : writer,
                "reply" : reply
            }
            db.FreeBoard.insert(f)  # Database 안에 document 저장

            return {
                "message" : "글 작성에 성공했습니다."
            }

        # except:
        #     raise Exception("글 작성에 실패했습니다.")


class getFreeBoard(Resource):
    def get(self):
        freeboard = db.FreeBoard.find()

        if freeboard is None:
            return {"error" : "데이터가 없습니다."}

        result = []
        for text in freeboard:
            if text is not None:
                temp = {
                    "title" : text['title'],
                    "content" : text['content'],
                    "_id" : text['_id'],
                    "date" : text['date'],
                    "views" : text['views'],
                    "likes" : text['likes'],
                    "writer" : text['writer'],
                    "reply" : text['reply']
                }
                result.append(temp)
            # result.sort(key="_id")
        result = sorted(result, key=lambda result: (result['_id']))
            # print(result)
        # print(result)

        return { "result" : result }