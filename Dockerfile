FROM python:3.7

# Create app directory
WORKDIR /usr/src/app

RUN pip3 install tornado==4.2.0
RUN pip3 install oauth2client
RUN pip3 install --upgrade google-api-python-client
COPY . .

EXPOSE 8888

CMD ["python", "index.py"]