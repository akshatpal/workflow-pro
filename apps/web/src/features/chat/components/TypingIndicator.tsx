interface Props {
  userName?: string;
}

export default function TypingIndicator({
  userName,
}: Props) {
  if (!userName) {
    return null;
  }

  return (
    <div className="px-2 pb-2 text-xs text-slate-400">
      <span>
        {userName} is typing
      </span>

      <span className="ml-1 inline-flex gap-0.5">
        <span className="animate-bounce">
          .
        </span>

        <span className="animate-bounce [animation-delay:150ms]">
          .
        </span>

        <span className="animate-bounce [animation-delay:300ms]">
          .
        </span>
      </span>
    </div>
  );
}