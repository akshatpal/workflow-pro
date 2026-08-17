import { useState, useMemo } from "react";
import { Search, SquarePen, MessageSquarePlus } from "lucide-react";

import { useAppSelector } from "@/store/hooks";
import { useGetConversationsQuery } from "../chatApi";
import type { Conversation } from "../chat.types";

interface Props {
  currentUserId?: string;
  selectedConversationId: string | null;
  onSelectConversation: (
    conversation: Conversation
  ) => void;
  onOpenNewChat?: () => void;
}

function getMemberUserId(user: any): string {
  if (!user) return "";
  if (typeof user === "string") return user;
  return user._id || user.id || "";
}

function getConversationDisplayName(
  conversation: Conversation,
  currentUserId: string
): string {
  if (conversation.type === "DIRECT") {
    const otherMember = conversation.members?.find((member) => {
      const uid = getMemberUserId(member.user);
      return uid && uid !== currentUserId;
    });

    if (otherMember && typeof otherMember.user === "object") {
      return otherMember.user.name || otherMember.user.email || "Unknown User";
    }

    return "Direct Message";
  }

  return conversation.name || "Group Conversation";
}

export default function ChatSidebar({
  currentUserId: propUserId,
  selectedConversationId,
  onSelectConversation,
  onOpenNewChat,
}: Props) {
  const authUser = useAppSelector((state) => state.auth.user);
  const currentUserId = propUserId || authUser?._id || authUser?.id || (authUser as any)?.userId || "";

  const [search, setSearch] = useState("");

  const {
    data: conversations = [],
    isLoading,
    isError,
  } = useGetConversationsQuery(currentUserId || undefined);

  const filteredConversations = useMemo(() => {
    if (!Array.isArray(conversations)) return [];
    if (!search.trim()) return conversations;
    const lower = search.toLowerCase();

    return conversations.filter((conversation) => {
      const displayName = getConversationDisplayName(conversation, currentUserId);
      if (displayName.toLowerCase().includes(lower)) return true;

      if (conversation.type === "DIRECT") {
        const otherMember = conversation.members?.find((member) => {
          const uid = getMemberUserId(member.user);
          return uid && uid !== currentUserId;
        });

        if (otherMember && typeof otherMember.user === "object") {
          return otherMember.user.email?.toLowerCase().includes(lower);
        }
      }

      return false;
    });
  }, [conversations, search, currentUserId]);

  return (
    <aside className="flex w-full shrink-0 flex-col border-r bg-slate-50 md:w-80">
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">
            Chats
          </h2>

          {onOpenNewChat && (
            <button
              type="button"
              onClick={onOpenNewChat}
              title="New Conversation"
              className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition shadow-xs"
            >
              <SquarePen size={15} />
              <span>New Chat</span>
            </button>
          )}
        </div>

        <div className="relative mt-4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search conversations..."
            className="w-full rounded-lg border bg-slate-50 py-2 pl-10 pr-3 outline-none focus:border-blue-500 focus:bg-white text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <ConversationSkeleton />
        )}

        {isError && (
          <div className="p-5 text-sm text-red-500">
            Failed to load
            conversations.
          </div>
        )}

        {!isLoading &&
          !isError &&
          conversations.length === 0 && (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-3">
                <MessageSquarePlus size={22} />
              </div>
              <p className="text-sm font-medium text-slate-700">No conversations yet</p>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Start chatting with your team members
              </p>
              {onOpenNewChat && (
                <button
                  type="button"
                  onClick={onOpenNewChat}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow hover:bg-blue-700 transition"
                >
                  Start a Conversation
                </button>
              )}
            </div>
          )}

        {!isLoading &&
          !isError &&
          conversations.length > 0 &&
          filteredConversations.length === 0 && (
            <div className="p-5 text-center text-sm text-slate-500">
              No conversations found matching "{search}".
            </div>
          )}

        {filteredConversations.map(
          (conversation) => {
            const convId = conversation.id || (conversation as any)._id;
            return (
              <ConversationItem
                key={convId}
                conversation={
                  conversation
                }
                currentUserId={
                  currentUserId
                }
                selected={
                  convId ===
                  selectedConversationId
                }
                onClick={() =>
                  onSelectConversation(
                    conversation
                  )
                }
              />
            );
          }
        )}
      </div>
    </aside>
  );
}

interface ConversationItemProps {
  conversation: Conversation;
  currentUserId: string;
  selected: boolean;
  onClick: () => void;
}

function ConversationItem({
  conversation,
  currentUserId,
  selected,
  onClick,
}: ConversationItemProps) {
  const displayName = getConversationDisplayName(
    conversation,
    currentUserId
  );

  const lastMessage =
    conversation.lastMessage;

  return (
    <button
      onClick={onClick}
      className={`flex w-full gap-3 border-b p-4 text-left transition ${
        selected
          ? "bg-blue-50"
          : "hover:bg-white"
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
        {displayName
          ? displayName.charAt(0).toUpperCase()
          : "C"}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-medium text-slate-900">
            {displayName}
          </h3>

          {lastMessage && (
            <span className="shrink-0 text-[11px] text-slate-400">
              {formatTime(
                lastMessage.createdAt
              )}
            </span>
          )}
        </div>

        <p className="mt-1 truncate text-sm text-slate-500">
          {lastMessage?.deleted
            ? "Message deleted"
            : lastMessage?.message ||
              "No messages yet"}
        </p>
      </div>
    </button>
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

function ConversationSkeleton() {
  return (
    <div className="space-y-1 p-2">
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse gap-3 rounded-lg p-3"
        >
          <div className="h-11 w-11 rounded-full bg-slate-200" />

          <div className="flex-1">
            <div className="h-4 w-2/3 rounded bg-slate-200" />

            <div className="mt-2 h-3 w-full rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}