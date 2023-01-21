#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from app import app
from flask import render_template, request, url_for, redirect, session, make_response


@app.route('/')
@app.route('/index')
def base():
    return render_template('index.html')

@app.route('/calendar')
def calendar():
    return render_template('calendar.html')

@app.route('/Enriqueasteregg')
def enrique():
    return render_template('enrique.html')

@app.route('/sobre-nosotros')
def about():
    return render_template('sobre-nosotros.html')