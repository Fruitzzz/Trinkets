const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const socketConnect = require("./utils/socket");
const app = express();
const server = http.createServer(app);

app.use(express.json({ extended: true, limit: "50mb" }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/collections", require("./routes/collections.routes"));
app.use("/api/items", require("./routes/items.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'))
}
socketConnect(server);
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    server.listen(process.env.PORT || config.get("port"), () =>
      console.log(`Server has started.`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
};

start();
