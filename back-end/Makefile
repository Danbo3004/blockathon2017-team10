NAME = Fight Together
VERSION = 1.0
CUR_DIR = $(shell basename $(CURDIR))

.PHONY: start dev_up composer bower dbmigrate

dev-up:
	docker-compose up -d --remove-orphans

staging-up:
	docker-compose -f docker-compose-staging.yml up -d --remove-orphans

dev-ps:
	docker-compose ps

staging-ps:
	docker-compose -f docker-compose-staging.yml ps

fuge:
	docker-compose exec microservices fuge shell fuge/fuge.yml
	
pm2:
	docker-compose -f docker-compose-staging.yml exec microservices pm2 start pm2/ecosystem.config.js

ssh:
	docker-compose -f docker-compose-staging.yml exec microservices /bin/bash

dev-build:
	docker-compose build

staging-build:
	docker-compose -f docker-compose-staging.yml build

dev-down:
	docker-compose down

staging-down:
	docker-compose -f docker-compose-staging.yml down	

restart:
	docker-compose restart ${service}
