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


def getAllMembers():
    db = mongo_client.UAMADV
    junta = db['Personas_relevantes'].aggregate([
    {
        '$unwind': {
            'path': '$datos'
        }
    }, {
        '$match': {
            'datos.grupo': 'Junta Directiva'
        }
    }, {
        '$project': {
            '_id' : 0,
            'nombre': 1, 
            'datos': 1, 
            'url': '$url-foto'
        }
    }
])
    destacados = db['Personas_relevantes'].aggregate([
    {
        '$unwind': {
            'path': '$datos'
        }
    }, {
        '$match': {
            'datos.grupo': 'Miembros Destacados'
        }
    }, {
        '$project': {
            '_id' : 0,
            'nombre': 1, 
            'datos': 1, 
            'url': '$url-foto'
        }
    }
])
    fundadores = db['Personas_relevantes'].aggregate([
    {
        '$unwind': {
            'path': '$datos'
        }
    }, {
        '$match': {
            'datos.grupo': 'Fundadores'
        }
    }, {
        '$project': {
            '_id' : 0,
            'nombre': 1, 
            'datos': 1, 
            'url': '$url-foto'
        }
    }
])
    web = db['Personas_relevantes'].aggregate([
    {
        '$unwind': {
            'path': '$datos'
        }
    }, {
        '$match': {
            'datos.grupo': 'Pagina Web'
        }
    }, {
        '$project': {
            '_id': 0,
            'nombre': 1, 
            'datos': 1, 
            'url': '$url-foto'
        }
    }
])
    return junta, destacados, fundadores, web
