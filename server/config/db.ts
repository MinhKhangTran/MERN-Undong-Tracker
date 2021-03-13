import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(
      colors.rainbow(`Verbunden mit der DB ${connection.connection.host}`)
    );
  } catch (error) {
    console.log(colors.red.bold(`Error: ${error}`));
    process.exit(1);
  }
};
export default connectDB;
