
all:
	cd backend && npm i && npm run start:dev &
	cd frontend && npm i && npm run dev
	
re: clean all
