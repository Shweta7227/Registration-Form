const mongoose = require("mongoose");

// Define the address schema first
const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true }
});

// Now define the main user schema
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  countryCode: { type: String, default: "+91" },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  age: { type: Number, required: true },
  primaryAddress: { type: AddressSchema, required: true },   // nested schema
//   secondaryAddress: { type: AddressSchema },                 // optional
  password: { type: String, required: true },
  terms: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create the model
const UserModel = mongoose.model("forms", UserSchema);

module.exports = UserModel;
