ARGUMENTS=$(filter-out $@,$(MAKECMDGOALS))

install:
	docker-compose run node npm install

start:
	docker-compose up -d --force-recreate

run-tests:
	docker-compose run node npm run test $(ARGUMENTS)

npm:
	docker-compose run node npm $(ARGUMENTS)
