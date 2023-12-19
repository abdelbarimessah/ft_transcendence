
all:
	cd backend && npm run start:dev & cd frontend && npm run dev
	
re: clean all
