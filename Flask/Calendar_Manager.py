from flask_restful import Resource, reqparse
from datetime import datetime

from db import db

class getEvent(Resource):
    def get(selfs):
        event = db.Event.find()

        result = []

        for e in event:
            temp = {
                "start" : e['start'],
                "end" : e['end'],
                "title" : e['title']

            }
            result.append(temp)
        return {"result" : result}



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



            E = {
                "start" : start,
                "end" : end,
                "title" : title
            }
            db.Event.insert(E)  # Database 안에 document 저장

            return {
                "message": "일정 작성에 성공했습니다."
            }


        except:
            raise Exception("일정 작성에 실패했습니다.")
