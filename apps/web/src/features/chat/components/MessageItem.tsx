import type { Message } from "../chat.types";

interface Props {
  message: Message;
  currentUserId: string;
}

export default function MessageItem({
  message,
  currentUserId,
}: Props) {
  const senderId =
    typeof message.sender === "object" && message.sender !== null
      ? (message.sender as any)._id || message.sender.id
      : message.sender;

  const isOwnMessage = String(senderId) === String(currentUserId);

  const senderName =
    typeof message.sender === "object" && message.sender !== null
      ? message.sender.name || "User"
      : "User";

  if (message.deleted) {
    return (
      <div
        className={`flex ${
          isOwnMessage ? "justify-end" : "justify-start"
        }`}
      >
        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm italic text-slate-400">
          Message deleted
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative flex max-w-[75%] gap-2 ${
          isOwnMessage ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isOwnMessage && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
            {senderName.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          {!isOwnMessage && (
            <p className="mb-1 text-xs font-medium text-slate-500">
              {senderName}
            </p>
          )}

          <div
            className={`rounded-2xl px-4 py-3 ${
              isOwnMessage
                ? "rounded-tr-sm bg-blue-600 text-white"
                : "rounded-tl-sm bg-slate-100 text-slate-800"
            }`}
          >
            <p className="whitespace-pre-wrap break-words text-sm">
              {message.message}
            </p>

            <div
              className={`mt-1 flex items-center gap-2 text-[10px] ${
                isOwnMessage ? "text-blue-100" : "text-slate-400"
              }`}
            >
              <span>{formatTime(message.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(value?: string) {
  if (!value) return "";
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}