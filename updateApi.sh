#!/bin/bash


docker stop MinesweeperFrontend;

docker rm MinesweeperFrontend;

docker rmi minesweeperfrontend:latest;

docker build --pull --rm -f "Dockerfile" -t minesweeperfrontend:latest ".";

docker run -d -p 5151:80 --name=MinesweeperFrontend minesweeperfrontend:latest;
