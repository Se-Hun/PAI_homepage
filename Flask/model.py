from flask import Flask
from flask_mongoalchemy import MongoAlchemy

app = Flask(__name__)
app.config['MONGOALCHEMY_DATABASE'] = 'PAI_Homepage' # 수정할것!
app.config['MONGOALCHEMY_CONNECTION_STRING'] = 'mongodb://localhost:27017/PAI_Homepage' # 수정할것!
# app.config['MONGOALCHEMY_CONNECTION_STRING'] = 'mongodb://168.188.128.40:/PAI_Homepage' # 포트 번호 수정해야함!
db = MongoAlchemy(app)

class User(db.Document):
    userId = db.StringField()
    password = db.StringField()
    role = db.StringField()
    username = db.StringField()
    studentId = db.StringField()
    phonenumber = db.StringField()
    major = db.StringField()
    sex = db.StringField()
    birth = db.StringField()

class FreeBoard(db.Document):
    title = db.StringField()
    content = db.StringField()
    id = db.IntField()
    date = db.StringField()
    views =db.IntField()
    likes = db.IntField()
    writer = db.StringField()
    reply = db.ListField(db.StringField())
    # restrict = db.StringField()

'''
class Should_Confirm_User(db.Document):
    userId = db.StringField()
    password = db.StringField()
    role = db.StringField()
    username = db.StringField()
    studentId = db.StringField()
'''