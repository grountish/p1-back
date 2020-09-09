const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sceneSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  name:{type:String},
  strokeR: {type: Number},
  strokeB: {type: Number},
  strokeG: {type: Number},
  patterns:{type: Schema.Types.Mixed},
  capture: {type: String},
  canvas: {type:Number},
  bpm:{type:String},
  alphaStroke:{type:Number},
  betaStroke:{type:Number},
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Scene = mongoose.model('Scene', sceneSchema);

module.exports = Scene;