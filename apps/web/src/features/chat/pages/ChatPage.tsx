import { useState, useMemo } from "react";

import { useAppSelector } from "@/store/hooks";
import { getAuthUserId, getAuthUserRole } from "@/features/auth/authUtils";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import NewConversationModal from "../components/NewConversationModal";

import type { Conversation } from "../chat.types";

interface Props {
  currentUserId?: string;
}

export default function ChatPage({ currentUserId: propUserId }: Props = {}) {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const currentUserId = useMemo(
    () => propUserId || getAuthUserId(user, accessToken),
    [propUserId, user, accessToken]
  );
  const userRole = useMemo(
    () => getAuthUserRole(user, accessToken),
    [user, accessToken]
  );
  const canCreateChat = userRole !== "EMPLOYEE";

  const [
    selectedConversation,
    setSelectedConversation,
  ] = useState<Conversation | null>(null);

  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-80px)] min-h-0 overflow-hidden rounded-xl border bg-white">
      <ChatSidebar
        currentUserId={currentUserId}
        selectedConversationId={selectedConversation?.id ?? null}
        onSelectConversation={setSelectedConversation}
        onOpenNewChat={canCreateChat ? () => setIsNewChatOpen(true) : undefined}
      />

      <ChatWindow
        conversation={selectedConversation}
        currentUserId={currentUserId}
        onOpenNewChat={canCreateChat ? () => setIsNewChatOpen(true) : undefined}
      />

            <NewConversationModal
                open={isNewChatOpen}
                onClose={() => setIsNewChatOpen(false)}
                onConversationCreated={(conversation) => {
                    setSelectedConversation(conversation);
                }}
                currentUserId={currentUserId}
            />
        </div>
    );
}

