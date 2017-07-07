'use strict';
// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const trackingSchema = new Schema({
  trackingid: Number,
  separationid: Number,
  area: {type: Number, required: true},
  position: {type: Number, required: true},
  heat: Number,
  objnumber: Number,
  trkid: Number,
  status: Boolean,
  itemsnum: Number,
  time: Date,
  areaname: String,
  aposition: Number,
  length: Number,
  cutlength: Number,
  created_at: Date,
  updated_at: Date
});

trackingSchema.index({ area: 1, position: 1 });
/*
const computed = {
  fullname() {
    console.log(this.meta.firstname + ' ' + this.meta.lastname);
    return this.meta.firstname + ' ' + this.meta.lastname;
  },

  firstname() {
    console.log(this.meta.firstname);
    return this.meta.firstname;
  },

  lastname() {
    console.log(this.meta.lastname);
    return this.meta.lastname;
  }
}
userSchema.methods = Object.assign(userSchema.methods, computed);
*/
const Tracking = mongoose.model('Tracking', trackingSchema);
module.exports = Tracking;
