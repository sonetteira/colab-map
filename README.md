an open layer map application for the escolab project at pace university

to run application,
open command line in this directory
	npm init
add the following lines to scripts in package.json
	"start": "parcel index.html",
	"build": "parcel build --public-url . index.html"
run in command line
	npm install ol
	npm install --save-dev parcel-bundler
	npm start
go to http://localhost:1234/

to run on a webserver:
	npm run build
copy dist/ folder to server