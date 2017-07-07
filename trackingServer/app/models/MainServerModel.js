'use strict';
const OraWebTrckModel = require('./OraWebTrckModel');
const MngMainModel = require('./MngMainModel');
module.exports =
class MainServerModel {
  constructor() {
    this.OracleWebTrckModel = new OraWebTrckModel();
    this.MngMainModel = new MngMainModel();
  }

  mainPageAction(request, reply){

      reply('Main page by model ! ');
  }

  loadTrackingData(request, reply){
    this.OracleWebTrckModel.getTrakingData().then((rows)=>{
      console.log('oracle request completed !');
      let res='';
      rows.forEach((row,rnum)=>{
        res+='<div><b>'+rnum+'</b> ['+row.length+']'+JSON.stringify(row)+'</div>';
        this.MngMainModel.addTrackingRow(row);
      }
    );
      reply(res);
    });
  }

  getTrackingData(request, reply){
    this.MngMainModel.getTrackingRows().then((rows)=>reply(rows));
  }
}
