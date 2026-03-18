@echo off
echo Starting Wanderlux FastAPI backend...
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
