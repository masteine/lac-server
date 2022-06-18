const { Server } = require("./server");
const { port } = require("./configuration");

const startServer = new Server()
  .start(port)
  .then((port) => console.log(`Server is running on Port:${port}`))
  .catch((error) => {
    console.log(error);
  });
