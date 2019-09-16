import pymongo

conn = pymongo.MongoClient('mongodb://localhost:27017/PAI_Homepage')
#conn = pymongo.MongoClient('mongodb://isoft:nia5602@168.188.128.40:5303/NIAProject')
db = conn['PAI_Homepage']


# role = Admin, Executive, User