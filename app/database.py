from pymongo import MongoClient

mongo_client = MongoClient('mongodb+srv://admin:adminmanupa@uamadv.nrfpkf2.mongodb.net/UAMADV?authMechanism=DEFAULT')

#VERSION PRELIMINAR POR ENRIQUE ORTEGA

def getAllProjects():
    db = mongo_client.UAMADV
    return db['Proyectos'].find()