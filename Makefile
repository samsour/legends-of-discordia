install:
	docker-compose run node npm install

run-tests:
	MONGO_PATH=mongodb://mongo:27017 docker-compose run node npm run test
