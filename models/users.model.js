const userSchema = new Schema({
   name: String,
   email: String,
   // TODO: only use OAuth eventually
   password: String,
   permissionLevel: Number
});
