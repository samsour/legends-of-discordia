ARGUMENTS=$(filter-out $@,$(MAKECMDGOALS))

install:
	docker-compose run node npm install

run-tests:
	docker-compose run node npm run test

npm:
	docker-compose run node npm $(ARGUMENTS)
