import { useSockets } from "../context/socket.context";

function MessagesContainer() {
  const { socket, messages, roomId, username } = useSockets();

  if (!roomId) return <div />;

  return (
    <div>
      {messages.map((m, i) => (
        <p key={i}>{JSON.stringify(m)}</p>
      ))}
    </div>
  );
}

export default MessagesContainer;
