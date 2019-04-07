# GSEC_Dashboard_API
This API is built to enhance the performance of Almeydan Dashboard for General Secretariate of Abu Dhabi Executive Council.

The API fetches the projects data, mapp the projects to its features (polygons, lines and points), calculate the the center of the projects and make it up and ready to be reqeuested from the dashboard.

## Technologies used
The API is a [nodejs](https://nodejs.org/en/) application programmed with [typescript](https://www.typescriptlang.org/) and built using [Express](https://expressjs.com/) framework and hosted on IIS server using [azure/iisnode](https://github.com/Azure/iisnode).

## API idea
The idea is to preload all the needed data from the databases to the memory of the server to be up and ready to be called from the dashboard.

## data that can be called from the API
**almeydan api**
- Project Details + project features + center of each project in the map.
`[hostname]/node/dashboardapi/projects`

**features**
- Polygons
`[hostname]/node/dashboardapi/features/polygons`
- Lines
`[hostname]/node/dashboardapi/features/lines`
- Points
`[hostname]/node/dashboardapi/features/points`

**geo analyzer**
- Demographics Features
`[hostname]/node/dashboardapi/geoanalyzer/demographics`
- Electricity Features
`[hostname]/node/dashboardapi/geoanalyzer/electricity`
- Water Features
`[hostname]/node/dashboardapi/geoanalyzer/water`
- Hospitals
`[hostname]/node/dashboardapi/geoanalyzer/hospitals`
- Clinics
`[hostname]/node/dashboardapi/geoanalyzer/clinics`
- Police Stations
`[hostname]/node/dashboardapi/geoanalyzer/policestations`
- Civil Defence Stations
`[hostname]/node/dashboardapi/geoanalyzer/civildefencestations`
- Ambulance Stations
`[hostname]/node/dashboardapi/geoanalyzer/ambulancestations`
- Public Schools
`[hostname]/node/dashboardapi/geoanalyzer/publicschools`
- Private Schools
`[hostname]/node/dashboardapi/geoanalyzer/privateschools`
- Places of Worship
`[hostname]/node/dashboardapi/geoanalyzer/placesofworship`
- Hotels
`[hostname]/node/dashboardapi/geoanalyzer/hotels`
- Houses
`[hostname]/node/dashboardapi/geoanalyzer/houses`
- traffic areas
`[hostname]/node/dashboardapi/geoanalyzer/traffic`

## Reloading data to the memory
the data are loaded automatically from the databases as soon as the api start running. However, since loading and calucating the projects takes some time. at the beginning the api relies on a previous projects data that is already saved on a json file from the previous session.

the api is programmed to reload the data in the memory every day at 8:00 a.m and 12:00 a.m. when the projects are being reloaded the end user will not feel anything. everything will happen in the backend. as soon as the reloading is finished. the end user will see the updated data.

Sometimes forced reloading is needed, any data mentioned can be reloaded by sending an http request: ([data link]/load).

Ex: `[hostname]/node/dashboardapi/projects/load`

## Debugging
All the actions and interactions occured with the API are saved in the logs folder inside the source folder.

the current day logs can be checked immediately by visiting the following link

`[hostname]/node/dashboardapi/log`

## Configuration
the username, password, domain and all the database links can be configured by editting the `configuration.ts` in the `src` folder.

Note: Any change in the typscript code (`src` folder) should be compiled to rebuild the application using the following command:

`npm run build`

## Author
The program is created by [IDOM Consulting Engineering and Architecure](http://idom.com/) - Dubai Branch.