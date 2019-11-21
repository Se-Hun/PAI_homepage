import pymongo

#conn = pymongo.MongoClient('mongodb://localhost:27017/PAI_Homepage')
conn = pymongo.MongoClient('mongodb://PAI:1119@168.188.128.40:5203/PAI')
db = conn['PAI']


# role = Admin, Executive, User