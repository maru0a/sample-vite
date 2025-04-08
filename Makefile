deploy:
	npm run build
	firebase deploy --only hosting,firestore