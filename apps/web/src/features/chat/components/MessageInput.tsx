import {
  useRef,
  useState,
} from "react";

import {
  Send,
} from "lucide-react";

interface Props {
  onSend: (
    message: string
  ) => Promise<void>;

  isSending: boolean;

  onTyping?: () => void;

  onStopTyping?: () => void;
}

export default function MessageInput({
  onSend,
  isSending,
  onTyping,
  onStopTyping,
}: Props) {
  const [message, setMessage] =
    useState("");

  const typingTimeout =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

  const handleChange = (
    value: string
  ) => {
    setMessage(value);

    onTyping?.();

    if (typingTimeout.current) {
      clearTimeout(
        typingTimeout.current
      );
    }

    typingTimeout.current =
      setTimeout(() => {
        onStopTyping?.();
      }, 1000);
  };

  const submit = async () => {
    const value =
      message.trim();

    if (!value || isSending) {
      return;
    }

    await onSend(value);

    setMessage("");

    onStopTyping?.();

    if (typingTimeout.current) {
      clearTimeout(
        typingTimeout.current
      );
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      void submit();
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-end gap-3">
        <textarea
          value={message}
          onChange={(event) =>
            handleChange(
              event.target.value
            )
          }
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Type a message..."
          className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border px-4 py-3 text-sm outline-none focus:border-blue-500"
        />

        <button
          disabled={
            isSending ||
            !message.trim()
          }
          onClick={() =>
            void submit()
          }
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>

      <p className="mt-2 text-xs text-slate-400">
        Enter to send · Shift +
        Enter for a new line
      </p>
    </div>
  );
}