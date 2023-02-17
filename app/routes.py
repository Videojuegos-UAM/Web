#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from app import app
from app import database
from flask import render_template, request, url_for, redirect, session, make_response



@app.route('/')
@app.route('/index')
def base():
    return render_template('index.html')

@app.route('/calendar')
def calendar():
    return render_template('calendar.html')

@app.route('/apuntate')
def apuntate():
    return render_template('apuntate.html')

@app.route('/Enriqueasteregg')
def enrique():
    return render_template('enrique.html')

@app.route('/sobre-nosotros')
def about():
    junta, destacados, fundadores, web = database.getAllMembers()
    return render_template('sobre-nosotros.html', junta=junta, destacados=destacados, fundadores=fundadores, web=web)

@app.route('/projects')
def projects():
    projects = database.getAllProjects() #A la larga puede no ser viable si hay muchos proyectos
                                         #Sustituir por database.getNumberOfProjects(num)
    return render_template('projects.html', projects=projects)

@app.route('/projects/<name>')
def project(name):
    project = database.getProjectbyName(name)
    for p in project:
        project = p

    return render_template('project.html', project=project) #Aun no existe project.html

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html')

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html')