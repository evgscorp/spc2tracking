'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const MainServerModel = require('./app/models/MainServerModel');
const cron = require('cron');
const server = new Hapi.Server();
const ServerModel = new MainServerModel();

server.connection({ port: 8888, host: '172.18.35.111' });

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply)=> ServerModel.mainPageAction(request,reply),
});

server.route({
    method: 'GET',
    path: '/oracle',
    handler: (request, reply)=>ServerModel.loadTrackingData(request, reply),
});

server.route({
    method: 'GET',
    path: '/tracking-data',
    handler: (request, reply)=>ServerModel.getTrackingData(request, reply),
});



server.start((err) => {
    if (err) {
        throw err;
    }
        console.log(`Server running at: ${server.info.uri}`);


    const cronJob = cron.job("* * * * * *", ()=>{
        ServerModel.loadTrackingData(()=>true, ()=>true);
        //console.info('cron job completed');
    });
    cronJob.start();
});

/*
server.register({
    register: require('hapi-cron'),
    options: {
        jobs: [{
            name: 'dataupload',
            time: '* * * * * *',
            timezone: 'Europe/Minsk',
            request: {
                method: 'GET',
                url: 'http://localhost:3000'
            },
            callback: (res) => {
                console.info('dataupload has run!');
            }
        }]
    },
}, (err) => {
    if (err) {
        return console.error(err);
    }
    server.start(() => {

        console.info(`Server started at ${ server.info.uri }`);
    });
});
*/
