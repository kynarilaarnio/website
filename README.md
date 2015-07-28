# Kynarilaarnio Website

Website for the "Akateeminen Kynariliiga" (AKL) Counter-Strike: Global Offensive tournament

## Directory structure

* `client/` - Angular web application
* `server/` - Express-powered backend


## Components used

* Skeleton provides responsive grid and other stuff, [see documentation here](http://getskeleton.com/)
* [Sass](http://sass-lang.com/) for styling
* PostgreSQL Database


## Get the development environment running

1. Create development database with following commands:

````
CREATE ROLE kynarilaarnio WITH LOGIN PASSWORD 'kynarilaarnio';
CREATE DATABASE kynarilaarnio WITH OWNER kynarilaarnio;
```

2. Generate your own Steam API-key [in here](http://steamcommunity.com/dev/apikey)
3. Insert the Steam API-key to environment variable `$KYNARILAARNIO_STEAM_API_KEY`
4. Run `npm install`
5. Run `bower install`
6. Run `gulp install`
7. Run `gulp`
8. Kynarilaarnio is now running at [http://localhost:9000](http://localhost:9000)!

**Prior to pushing to this repositoryRun `gulp jshint`, `gulp server:test`, `gulp client:test` and fix possible errors and warnings**

