from flask_restful import Resource, reqparse
from datetime import datetime

from db import db

class getArticle(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('board_type')
        parser.add_argument('_id')

        data = parser.parse_args()

        current_content = db[data['board_type']].find_one({"_id" : int(data['_id']) })

        if current_content is None:
            return {"error" : "해당 글이 없습니다."}

        new_views = current_content['views']
        new_views = new_views + 1

        message = db[data['board_type']].update_one({"_id" : int(data['_id'])}, {"$set" : {"views" : new_views}}, upsert=False)

        current_content['views'] = current_content['views'] + 1 # 조회수 1 증가

        if message.modified_count > 0:
            return {"result" : current_content}
        else:
            return {"error" : "해당 글이 없습니다."}


class submitReply(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        parser.add_argument('content')
        parser.add_argument('board_type')
        parser.add_argument('_id')

        data = parser.parse_args()

        # print(data['content'])

        current_content = db[data['board_type']].find_one({"_id" : int(data['_id']) })

        if current_content is None:
            return {"error" : "해당 글이 없습니다."}

        new_reply = current_content['reply']
        new_reply.append(
            {"name" : data['name'], "content" : data['content']}
        )

        message = db[data['board_type']].update_one({"_id": int(data['_id'])}, {"$set": {"reply": new_reply}}, upsert=False)

        if message.modified_count > 0:
            return {"message" : "댓글 작성에 성공했습니다."}
        else:
            return {"error" : "댓글 작성에 실패했습니다."}

class plusLikes(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('board_type')
        parser.add_argument('_id')

        data = parser.parse_args()

        current_content = db[data['board_type']].find_one({"_id": int(data['_id'])})

        if current_content is None:
            return {"error": "해당 글이 없습니다."}

        new_likes = current_content['likes']
        new_likes = new_likes + 1

        message = db[data['board_type']].update_one({"_id": int(data['_id'])}, {"$set": {"likes": new_likes}}, upsert=False)

        if message.modified_count > 0:
            return {"message": "추천에 성공했습니다."}
        else:
            return {"error" : "추천에 실패했습니다."}

