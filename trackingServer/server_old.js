//import Hapi from 'hapi';
'use strict';
//import MainServerModel from './app/models/MainServerModel';
//import Hapi from 'hapi';


const MainServerModel = require('./app/models/MainServerModel');
const Hapi = require('hapi');
const oracledb = require("oracledb");
const mongoose = require('mongoose');

const server = new Hapi.Server();
const ServerModel = new MainServerModel();

server.connection({ port: 3000, host: 'localhost' });
oracledb.createPool (
  {
    user          : "BMZRMRT",
    password      : "BMZRMRT",
    connectString : "172.18.35.1:1522/orclspc2.zsw.iron"
  },
  (err, pool)=>console.log(pool)
);

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply)=> ServerModel.mainPageAction(request,reply),
});


server.route({
    method: 'GET',
    path: '/mongotest',
    handler: (request, reply)=>{
      //mongoose.Promise = global.Promise;
      mongoose.Promise = require('bluebird');
      mongoose.connect('mongodb://localhost/spc2tracking');
      const User = require('./app/models/MongoTrackingModel');
      let answer='<h3>MongoDb test!</h3>'
      let chris = new User({ role:5, id:Math.random() , username: 'Chris_'+Math.random(), username: 'sevilayha',  password: 'password', meta: {firstname: 'Christian',lastname: 'Navarro'}});

      /*let fname=chris.fullname(function(err, name){
        //if (err) throw err;
      //  if (err)  console.log(err);
        console.log('New user will be created, full name is ' + name);
      //  answer+='New user will be created, full name is ';// + name+' id='+chris.id;
    });*/


      let ps=chris.save((err)=> {
        //if (err)  console.log(err);
      //  if (err) throw err;
        console.log('User saved successfully!'+' id='+chris.id);
        //answer+='<br>data was saved'+' id='+chris.fullname();
         answer+='New user was created, full name is ' +chris.fullname()+' id='+chris.id;
      });

    //  let pa=chris.fullname();
      Promise.all([ps,]).then(values => {
          console.log(values);
        //  answer+='New user will be created, full name is ' + values[0]+' id='+chris.id;
          reply(answer);
        });
    //  reply(answer);
    },
});



server.route({
    method: 'GET',
    path: '/oracle/{name}',
    handler: (request, reply)=>{
    let test= Object.create(null);
    test.outp=' ';
   // const pool = oracledb.getPool();
   let orapool = oracledb.getPool();
    //let dboutput="<h3>db output!</h3>";
  let op= new Promise((resolve, reject)=>{
  orapool.getConnection(
  /*{
    user          : "BMZRMRT",
    password      : "BMZRMRT",
    connectString : "172.18.35.1:1522/orclspc2.zsw.iron"
  },*/
  (rerror, connection)=>
  {
    if (rerror) { console.error(rerror); return; }
    connection.execute(
      "SELECT AREA_NAME, ABSOLUTE_POS "
    + "FROM WEB_TRK_DATA "
    + "WHERE nvl(TRACKING_ID,0) > 0 "
    + "ORDER BY ABSOLUTE_POS",
    (err, result)=>
      {
        if (err) { console.error(err);  reject(err); return; }
        //console.log(JSON.stringify(result.rows));
        test.outp =test.outp+'<b>rows = </b>' + JSON.stringify(result.rows) + '<br>';
        connection.release((err)=> {if(err) console.log('pool err ='+JSON.stringify(err));});
        resolve(true);
      //  reply('<b>Hello</b>, ' + encodeURIComponent(request.params.name) + '!' +test.outp);

    });
  });
    // fulfilled successfully
  });

  Promise.all([op,]).then(values => {
      console.log(values);
      reply('<b>Hello</b>, ' + encodeURIComponent(request.params.name) + '!' +test.outp);
      //orapool.close()
    });

        //reply('<b>Hello</b>, ' + encodeURIComponent(request.params.name) + '!' + dboutput);
      //  reply(dboutput);

    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
