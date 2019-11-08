import os
from flask import session, request, url_for
from flask_restful import Resource, reqparse
from werkzeug.utils import secure_filename

# class wakeup(Resource):
#     def get(self):
#         return "ok"
#
# class imageupload(Resource):
#     def post(self):
#         return ""

UPLOAD_FOLDER = 'C:/Users/tpgns/Desktop/PAI_homepage/Flask/images'
ALLOWED_EXTENSIONS = set(['image/png', 'image/jpg', 'image/jpeg', 'image/gif'])


class upload(Resource):
    def post(self):
        target = os.path.join(UPLOAD_FOLDER, 'upload')
        if not os.path.isdir(target):
            os.mkdir(target)
        # logger.info("welcome to upload`")
        file = request.files['file']

        if file.mimetype not in ALLOWED_EXTENSIONS:
            # print("aa")
            return {"error" : "지원되지 않는 확장자입니다."}

        # print(file)
        filename = secure_filename(file.filename)
        # print(filename)
        destination = "/".join([target, filename])
        file.save(destination)
        # session['uploadFilePath'] = destination
        # response = filename
        return {"message" : "파일 업로드에 성공했습니다."}
