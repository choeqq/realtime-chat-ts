import { Server, Socket } from "socket.io";
import logger from "./utils/logger";
import { nanoid } from "nanoid";

enum CLIENT {
  CREATE_ROOM = "CREATE_ROOM",
  SEND_ROOM_MESSAGE = "SEND_ROOM_MESSAGE",
}

enum SERVER {
  ROOMS = "ROOM",
  JOINED_ROOM = "JOINED_ROOM",
  ROOM_MESSAGE = "ROOM_MESSAGE",
}

const EVENTS = {
  CONNECTION: "connection",
  CLIENT,
  SERVER,
};

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    console.log(socket.id);
    logger.info(`User connected ${socket.id}`);

    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      const roomId = nanoid();

      rooms[roomId] = {
        name: roomName,
      };

      socket.join(roomId);

      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

      socket.emit(EVENTS.SERVER.ROOMS, rooms);

      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });

    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, username }) => {
        const date = new Date();

        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          message,
          username,
          time: `${date.getHours()}:${date.getMinutes()}`,
        });
      }
    );
  });
}

export default socket;
