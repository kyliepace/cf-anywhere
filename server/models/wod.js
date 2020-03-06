const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeEnum = ['time', 'emom', 'rounds', 'amrap', 'reps', 'sets', 'rft', 'cals', 'distance'];
const unitsEnum = ['ft', 'kg', 'lbs', 'm', 'km', 'mi'];
const sectionEnum = ['warmup', 'skill', 'barbell', 'accessory', 'wod'];
// Define our model
var wodSchema = mongoose.Schema({
  source: String,
  section: {
    type: String,
    enum: sectionEnum
  },
  type: {
    type: String,
    enum: typeEnum
  },
  movement: String,
  time: String,
  distance: Number,
  weight: Number,
  units: {
    type: String,
    enum: unitsEnum
  },
  movements: {
    type: [{
      movement: String,
      type: {
        type: String,
        enum: typeEnum
      },
      time: String,
      weight: Number,
      distance: Number,
      units: {
        type: String,
        enum: unitsEnum
      },
      movements: []
    }],
    default: undefined
  }
});


// Create the model class
const WodClass = mongoose.model('wod', wodSchema);

// Export the model
module.exports = WodClass;
