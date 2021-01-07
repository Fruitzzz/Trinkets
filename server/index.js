const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
const mongoUri =
  "mongodb+srv://Fruitzz:qwerty00@cluster0.4u2qd.mongodb.net/<dbname>?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json({extended: true}))
app.use("/api/auth", require("./routes/auth.routes"));
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    server.listen(process.env.PORT || 5000, () =>
      console.log(`Server has started.`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
};

start();
