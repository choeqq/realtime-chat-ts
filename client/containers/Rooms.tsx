import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  function handleCreateRoom() {
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName).trim()) return;

    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    newRoomRef.current.value = "";
  }

  return (
    <nav>
      <div>
        <input ref={newRoomRef} placeholder="Room name" />
        <button onClick={handleCreateRoom}>CREATE ROOM</button>
      </div>

      {Object.keys(rooms).map((key) => (
        <div key={key}>{rooms[key].name}</div>
      ))}
    </nav>
  );
}

export default RoomsContainer;
