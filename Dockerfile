# syntax=docker/dockerfile:experimental
# run node on linux
FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get upgrade -y

RUN apt-get install npm -y
RUN apt-get install sudo
RUN sudo apt install curl --yes
RUN sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
RUN bash -c "source ~/.bashrc && source ~/.nvm/nvm.sh && nvm install v18 && nvm use v18"

WORKDIR /app
COPY . .
RUN npm install

CMD [ "bash" ]
