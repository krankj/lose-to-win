const mongoose = require("../services/mongoose.service").mongoose;
const beautifyUnique = require("mongoose-beautiful-unique-validation");

let { Schema } = mongoose;
const opts = {
  toJSON: {
    virtuals: true, //this adds the "id" field
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id; //since id is added, this _id is not required
      delete ret.createdAt;
      delete ret.updatedAt;
    },
  },
  timestamps: true,
  //setDefaultsOnInsert: true, // not really sure if this field is required, since I checked that it works fine even without it.
};

let userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: "Email already exists ({VALUE})",
    },
    height: Number,
    weight: Number,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  opts
);
userSchema.plugin(beautifyUnique);

//quoteSchema.index({ quote: 1 }, { unique: true });

let User = mongoose.model("User", userSchema);

exports.insert = (userData) => {
  let user = new User(userData);
  return user.save();
};

exports.insertMany = (usersArray) => {
  return User.insertMany(usersArray, { ordered: false });
};

exports.delete = (userId) => {
  return new Promise((resolve, reject) => {
    User.deleteMany({ _id: userId }).exec((err, delMember) => {
      if (err) reject(err);
      resolve(delMember);
    });
  });
};

exports.findById = (userId) => {
  return User.findById({ _id: userId });
};

exports.update = (userId, newValues) => {
  return User.findByIdAndUpdate({ _id: userId }, newValues);
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec((err, users) => {
        if (err) reject(err);
        else resolve(users);
      });
  });
};

exports.getUserCount = () => {
  return User.countDocuments();
};
