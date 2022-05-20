# syntax=docker/dockerfile:experimental
# run node on linux
FROM ubuntu:latest
RUN apt-get update
RUN apt-get -y install nodejs
CMD ["node"]
