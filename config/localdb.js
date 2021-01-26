const mongoose = require('mongoose');

const connectLocalDB = async () => {
  const conn = await mongoose.connect(process.env.LOCAL_MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`Local MongoDB Connected: ${conn.connection.host}`
    .cyan.underline.bold);
}

module.exports = connectLocalDB;