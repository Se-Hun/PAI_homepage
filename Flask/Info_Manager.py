from flask_restful import Resource, reqparse
from datetime import datetime

from db import db

class getInfo(Resource):
    def get(self):
        info = db.Info.find()

        if info is None:
            return {"error" : "데이터가 없습니다."}

        result = []
        for text in info:
            if text is not None:
                temp = {
                    "title": text['title'],
                    "content": text['content'],
                    "due_date" : text['due_date'],
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