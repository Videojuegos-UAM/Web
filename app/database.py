import os
from pymongo import MongoClient

mongo_client = MongoClient(os.getenv('URL'))

#VERSION PRELIMINAR POR ENRIQUE ORTEGA

def getAllProjects():
    db = mongo_client.UAMADV
    return db['Proyectos'].aggregate([
        {
            '$project': {
                '_id': 0,
                'titulo': 1,
                'descripcion_corta': 1,
                'descripcion_larga': 1,
                'url': '$url-foto',
                'lista': 1
            }
        }
    ])

                

def getNumberOfProjects(num):
    db = mongo_client.UAMADV
    return db['Proyectos'].find().limit(num)

def getProjectbyName(name):
    db = mongo_client.UAMADV
    return db['Proyectos'].aggregate([
        {
            '$project': {
                '_id': 0,
                'titulo': 1,
                'descripcion_corta': 1,
                'descripcion_larga': 1,
                'url': '$url-foto',
                'lista': 1
            }
        },
        {
        '$match': {
            'titulo': name
        }
        }
    ])



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
            'datos.grupo': 'Web'
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
