from flask_restful import Resource, reqparse
from datetime import datetime

from db import db

class getAbout(Resource):
    def get(self):
        about = db.About.find()

        if about is None:
            return {"error" : "데이터가 없습니다."}

        result = []
        for content in about:
            if content is not None:
                temp = {
                    "text" : content['text'],
                    "date" : content['date'],
                    "writer" : content['writer']
                }
                result.append(temp)
        return {"result" : result}


class updateAbout(Resource):
    def post(self):
        # try:
            parser = reqparse.RequestParser()
            parser.add_argument('role')
            parser.add_argument('text')
            parser.add_argument('writer')

            data = parser.parse_args()

            if data['role'] == 'Admin':
                db.About.remove({})

                date = datetime.now()
                date = str(date.year) + "-" + str(date.month) + "-" + str(date.day) + " " + str(date.hour) + ":" + str(date.minute) + ":" + str(date.second)

                new_about = {
                    "text" : data['text'],
                    "writer" : data['writer'],
                    "date" : date
                }
                db.About.insert(new_about)
                return {
                    "message" : "About 수정에 성공했습니다."
                }
            else:
                {"error" : "접근 권한이 없습니다."}
        # except:
        #     raise Exception("글 작성에 실패했습니다.")
