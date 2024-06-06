#!/bin/sh
source .venv/bin/activate
python SAILearningWeb/manage.py runserver $PORT
