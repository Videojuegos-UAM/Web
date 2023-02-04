from pymongo import MongoClient

mongo_client = MongoClient('mongodb+srv://admin:adminmanupa@uamadv.nrfpkf2.mongodb.net/UAMADV?authMechanism=DEFAULT')

#VERSION PRELIMINAR POR ENRIQUE ORTEGA

def getAllProjects():
    db = mongo_client.UAMADV
    return db['Proyectos'].find()

def getNumberOfProjects(num):
    db = mongo_client.UAMADV
    return db['Proyectos'].find().limit(num)

def getProjectbyName(name):
    db = mongo_client.UAMADV
    return db['Proyectos'].find({'titulo': name})

#TODO: Funciones par obtener miembros por tipo quiza¿?