# Tyler Smith's Todo Example


## Start the app
Currently this app is just setup to run in the dev version.  If we were going to use this in production we would deploy the web and server separately.

# Prepare the server
Copy the .env.example file to .env and set variables accordingly to your local setup.

Currently the server is set to run on port 5001. This is hard-coded, but would be changed to be dynamic for a production build.

# Start the server
```
cd server
npm install
npm run start
```

# Start the web server
```
cd web
npm install
npm run serve
```