const Item = require("../models/Item");
const viewers = [];

const addViewer = ({ id, itemId }) => {
  const value = { id, itemId };
  viewers.push(value);
  return value;
};

const removeViewer = (socketId) => {
  const index = viewers.findIndex((viewer) => viewer.id === socketId);
  if (index !== -1) return viewers.splice(index, 1);
};

const getViewer = (id) => viewers.find((viewer) => viewer.id === id);

const socketConnect = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connect", (socket) => {
    socket.on("reqItem", async (itemId) => {
      const item = await Item.findById(itemId).lean();
      const clone = getViewer(socket.id)
      if(clone)
        removeViewer(clone.id);
      const newViewer = addViewer({ id: socket.id, itemId });
      socket.join(newViewer.itemId);
     socket.emit("resItem", item);
    });

    socket.on("addComment", async (comment) => {
      const viewer = getViewer(socket.id);
      if (viewer) {
        const item = await Item.findById(viewer.itemId);
        item.comments.push(comment);
        item.save();
        io.sockets.in(viewer.itemId).emit("updateItem", item);
      }
    });
    socket.on("like", async (userId) => {
      const viewer = getViewer(socket.id);
      if (viewer) {
        const item = await Item.findById(viewer.itemId);
        if (item.likes.includes(userId)) item.likes.pull(userId);
        else item.likes.push(userId);
        item.save();
        io.sockets.in(viewer.itemId).emit("updateItem", item)
      }
    });
    socket.on("disconnect", () => {
      removeViewer(socket.id);
    })
  });
};

module.exports = socketConnect;
