import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

enum CLIENT {
  CREATE_ROOM = "CREATE_ROOM",
}

const EVENTS = {
  CONNECTION: "connection",
  CLIENT,
};

function socket({ io }: { io: Server }) {
  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    console.log(socket.id);
    logger.info(`User connected ${socket.id}`);
  });
}

export default socket;
