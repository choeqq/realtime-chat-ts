import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

enum EVENTS {
  CONNECTION = "connection",
}

function socket({ io }: { io: Server }) {
  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);
  });
}

export default socket;
