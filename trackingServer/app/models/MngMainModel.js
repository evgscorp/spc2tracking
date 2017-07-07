'use strict';
const Tracking = require('./MngModelTracking');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
module.exports =
class MngMainModel {

  constructor() {
    mongoose.connect('mongodb://localhost/spc2tracking');
  }

  addTrackingRow(row){
    let trow = new Tracking({
      trackingid: row[0],
      separationid: row[1],
      area: row[2],
      position: row[3],
      heat: row[4],
      objnumber: row[5],
      trkid: row[6],
      status: row[7],
      itemsnum: row[8],
      time: row[9],
      areaname: row[10],
      aposition: row[11],
      length: row[12],
      cutlength: row[13],
    });

     Tracking.update({area: trow.area, position: trow.position}, trow, {upsert: true}, (err)=>{
        console.log('TrackingRow saved successfully!'+' area='+trow.area+' position='+trow.position);
     });

  }

    getTrackingRows(){
    return new Promise((resolve, reject) => {
      Tracking.find({}).exec((err,rows)=>{
        resolve(rows);
      });
    });
  }

}
