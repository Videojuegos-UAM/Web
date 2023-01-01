#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from app import app
from flask import render_template, request, url_for, redirect, session, make_response


@app.route('/')
@app.route('/base')
def base():
    return render_template('base.html')
