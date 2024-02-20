
run:
	bash f.sh
	cd backend && npm i && npm run start:dev
	

all:
	cd frontend && npm i && npm run dev &
	cd backend && npm i && npm run start:dev 
	
re: clean all
