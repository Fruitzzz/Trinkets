const Item = require("./models/Item");
const socketConnect = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connect", (socket) => {
    socket.on("reqItem", async (itemId, callback) => {
      const item = await Item.findById(itemId).lean();
      console.log(item);
      io.sockets.emit("resItem", item);
    });
  });
};

module.exports = socketConnect;
