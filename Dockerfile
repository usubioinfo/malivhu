FROM ubuntu:20.04
FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /app

WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/

CMD [ "python3", "manage.py", "runserver", "9001" ]
