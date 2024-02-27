build:
	docker-compose up --build
db:
	docker run --name mypostgresdb -e POSTGRES_USER=messah -e POSTGRES_PASSWORD=123123 -e POSTGRES_DB=mydb -p 5432:5432 -d postgres
run:
	bash f.sh
	cd backend && npm i && npm run start:dev
	

all:
	cd frontend && npm i && npm run dev &
	cd backend && npm i && npm run start:dev 

clean:
	-docker rm -f $$(docker ps -aq)
	
re: clean build
