enum CLIENT {
  CREATE_ROOM = "CREATE_ROOM",
}

enum SERVER {
  ROOMS = "ROOM",
  JOINED_ROOM = "JOINED_ROOM",
}

const EVENTS = {
  CONNECTION: "connection",
  CLIENT,
  SERVER,
};

export default EVENTS;
