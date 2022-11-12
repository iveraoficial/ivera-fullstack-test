import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

export default mongoose;