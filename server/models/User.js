const mongoose = require("mongoose");
const zod = require("zod");


const UserSchemaValidation = zod.object({
  firstName: zod.string(),
  username: zod.string().email(), // Ensure username follows email format
  password: zod.string(),
});


function validateUser(user) {
  return UserSchemaValidation.parse(user);
}


const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    username: {
      type: String,
      unique: true,
      validate: {
        validator: (v) => UserSchemaValidation.safeParse({ username: v }).success,
        message: "Username must be a valid email address",
      },
    },
    password: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
  User: UserModel,
  validateUser,
};
