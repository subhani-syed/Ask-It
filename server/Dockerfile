FROM python:3.10.9-alpine

COPY requirements.txt requirements.txt

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

WORKDIR /app

COPY ./entrypoint.sh /

ENTRYPOINT [ "sh","/entrypoint.sh" ]