# exoplex

Kepler Exoplanet Explorer

![exoplex architecture](https://github.com/tysongf/exoplex/blob/master/exoplex_architecture.png?raw=true)

## Getting Started

1. Ensure you have Node.js installed.
2. Create a free [Mongo Atlas](https://www.mongodb.com/atlas/database) database online or start a local MongoDB database.
3. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.
4. In the terminal, run: `npm install`

## Running the Project

1. In the terminal, run: `npm run deploy`
2. Browse to the mission control frontend at [localhost:8000](http://localhost:8000) and schedule a launch!

## Running the Tests

To run any automated tests, run `npm test`. This will:

-  Run all the client-side tests: `npm test --prefix client`
-  Run all the server-side tests: `npm test --prefix server`

## Docker

1. Ensure you have the latest version of Docker installed
2. Run `docker build -t tysongf/exoplex .`
3. Run `docker run -it -p 8000:8000 tysongf/exoplex`

## EC2 Deployment

1. sudo yum update -y
2. sudo yum install docker
3. sudo service docker start
4. sudo usermod -a -G docker ec2-user
5. exit (and then log back in)
6. docker login
7. docker run --restart=always -p 8000:8000 tysongf/exoplex

## EC2 Continuous Deployment

1. sudo service docker start
2. docker login
3. docker pull -t tysongf/exoplex:latest
4. docker ps
5. docker stop [container_id]
6. docker image rm --force tysongf/exoplex
7. docker run --restart=always -p 8000:8000 tysongf/exoplex
