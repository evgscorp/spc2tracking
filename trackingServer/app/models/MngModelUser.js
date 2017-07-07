'use strict';
// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: Number, required: true},
  id: {type: Number, required: true, unique: true},
  admin: Boolean,
  location: String,
  meta: {
    firstname: String,
    lastname: String
  },
  created_at: Date,
  updated_at: Date
});

/*userSchema.methods.fullname = function(){
  //console.log(this.meta.firstname + ' ' + this.meta.lastname);
  return this.meta.firstname + ' ' + this.meta.lastname;
};*/

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

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
