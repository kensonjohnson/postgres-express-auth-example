type ChatItemProps = {
  role: "user" | "bot";
  message: string;
};

export function ChatItem({ role, message }: ChatItemProps) {
  return (
    <div>
      <h3>{role}</h3>
      <p>{message}</p>
    </div>
  );
}
