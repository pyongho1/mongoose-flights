import mongoose from "mongoose";

const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
    airline: {
      type: String,
      enum: ["American", "SouthWest", "United"],
    },
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    },
    flightNo: {
      type: Number,
      required: true,
      min: 10,
      max: 9999,
    },
    departs: {
      type: Date,
      default: function () {
        let date = new Date();
        let oneYearFromNow = date.getFullYear() + 1;
        date.setFullYear(oneYearFromNow);
        return date;
      },
    },
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model("Flight", flightSchema);

export { Flight };