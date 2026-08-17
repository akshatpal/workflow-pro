import {
    useEffect,
    useRef,
    useState,
    useMemo,
} from "react";

import {
    MessageCircle,
} from "lucide-react";

import {
    useGetMessagesQuery,
    useSendMessageMutation,
} from "../chatApi";

import { useAppSelector } from "@/store/hooks";
import { getAuthUserId } from "@/features/auth/authUtils";

import {
    socket,
} from "../socket";

import {
    joinConversation,
    leaveConversation,
    markMessageAsRead,
    startTyping,
    stopTyping,
} from "../chatSocket";

import type {
    Conversation,
    Message,
} from "../chat.types";

import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

interface Props {
    conversation: Conversation | null;

    currentUserId?: string;

    onOpenNewChat?: () => void;
}

export default function ChatWindow({
    conversation,
    currentUserId: propUserId,
    onOpenNewChat,
}: Props) {
    const { user: authUser, accessToken } = useAppSelector((state) => state.auth);
    const currentUserId = useMemo(
        () => propUserId || getAuthUserId(authUser, accessToken),
        [propUserId, authUser, accessToken]
    );
    const messagesEndRef =
        useRef<HTMLDivElement | null>(
            null
        );

    const [
        realtimeMessages,
        setRealtimeMessages,
    ] = useState<Message[]>([]);

    const [
        typingUserId,
        setTypingUserId,
    ] = useState<
        string | null
    >(null);

    const {
        data: messages = [],
        isLoading,
        isError,
    } =
        useGetMessagesQuery(
            conversation?.id ?? "",
            {
                skip: !conversation,
            }
        );

    const [
        sendMessage,
        {
            isLoading:
            isSending,
        },
    ] =
        useSendMessageMutation();

    /*
     * Reset real-time messages
     * whenever conversation changes.
     */
    useEffect(() => {
        setRealtimeMessages([]);
        setTypingUserId(null);
    }, [
        conversation?.id,
    ]);

    /*
     * Connect Socket.IO once.
     */
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        return () => {
            socket.off(
                "chat:message"
            );

            socket.off(
                "chat:typing"
            );

            socket.off(
                "chat:stopTyping"
            );

            socket.off(
                "chat:read"
            );
        };
    }, []);

    /*
     * Join / leave conversation.
     */
    useEffect(() => {
        if (!conversation) {
            return;
        }

        if (!socket.connected) {
            socket.connect();
        }

        joinConversation(
            socket,
            conversation.id
        );

        return () => {
            leaveConversation(
                socket,
                conversation.id
            );
        };
    }, [
        conversation?.id,
    ]);

    /*
     * Listen for real-time
     * messages and events.
     */
    useEffect(() => {
        if (!conversation) {
            return;
        }

        const handleMessage = (
            data: Message | {
                conversationId: string;
                message: Message;
            }
        ) => {
            let message: Message;

            /*
             * Supports both:
             *
             * { conversationId, message }
             *
             * and a direct Message.
             */
            if (
                "conversationId" in
                data
            ) {
                if (
                    data.conversationId !==
                    conversation.id
                ) {
                    return;
                }

                message =
                    data.message;
            } else {
                message = data;

                if (
                    message.conversation !==
                    conversation.id
                ) {
                    return;
                }
            }

            setRealtimeMessages(
                (current) => {
                    const alreadyExists =
                        current.some(
                            (item) =>
                                item.id ===
                                message.id
                        );

                    if (alreadyExists) {
                        return current;
                    }

                    return [
                        ...current,
                        message,
                    ];
                }
            );
        };

        const handleTyping = (
            data: {
                userId: string;
            }
        ) => {
            if (
                data.userId ===
                currentUserId
            ) {
                return;
            }

            setTypingUserId(
                data.userId
            );
        };

        const handleStopTyping = (
            data: {
                userId: string;
            }
        ) => {
            if (
                data.userId ===
                currentUserId
            ) {
                return;
            }

            setTypingUserId(null);
        };

        const handleRead = () => {
            /*
             * Read events will be
             * used in the next chat
             * improvements.
             */
        };

        socket.on(
            "chat:message",
            handleMessage
        );

        socket.on(
            "chat:typing",
            handleTyping
        );

        socket.on(
            "chat:stopTyping",
            handleStopTyping
        );

        socket.on(
            "chat:read",
            handleRead
        );

        return () => {
            socket.off(
                "chat:message",
                handleMessage
            );

            socket.off(
                "chat:typing",
                handleTyping
            );

            socket.off(
                "chat:stopTyping",
                handleStopTyping
            );

            socket.off(
                "chat:read",
                handleRead
            );
        };
    }, [
        conversation?.id,
        currentUserId,
    ]);

    /*
     * Scroll whenever messages
     * change.
     */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView(
            {
                behavior: "smooth",
            }
        );
    }, [
        messages,
        realtimeMessages,
    ]);

    if (!conversation) {
        return (
            <main className="hidden flex-1 items-center justify-center bg-white md:flex">
                <div className="text-center max-w-sm px-6">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                        <MessageCircle
                            size={30}
                            className="text-slate-400"
                        />
                    </div>

                    <h2 className="mt-5 text-xl font-semibold text-slate-800">
                        Select a conversation
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {onOpenNewChat
                            ? "Choose a chat from the sidebar or start a new direct message or group."
                            : "Choose a conversation from the sidebar to start messaging."}
                    </p>

                    {onOpenNewChat && (
                        <button
                            type="button"
                            onClick={onOpenNewChat}
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
                        >
                            Start New Conversation
                        </button>
                    )}
                </div>
            </main>
        );
    }

    const title =
        getConversationTitle(
            conversation,
            currentUserId
        );

    const allMessages =
        mergeMessages(
            messages,
            realtimeMessages
        );

    const typingUser =
        conversation.members.find(
            (member) => {
                const uid =
                    typeof member.user === "object" && member.user !== null
                        ? (member.user as any)._id || member.user.id
                        : member.user;
                return uid === typingUserId;
            }
        )?.user;

    const handleSend = async (
        message: string
    ) => {
        const convId = conversation.id || (conversation as any)._id;
        const senderId =
            currentUserId ||
            getAuthUserId(authUser, accessToken);

        const result =
            await sendMessage({
                conversation:
                    convId,

                sender:
                    senderId,

                message,
            }).unwrap();

        /*
         * REST API creates the
         * message. Socket event
         * broadcasts it to other
         * clients.
         *
         * Add our own result
         * immediately because the
         * backend socket does not
         * emit from sendMessage().
         */
        setRealtimeMessages(
            (current) => {
                const exists =
                    current.some(
                        (item) =>
                            (item.id || (item as any)._id) ===
                            (result.id || (result as any)._id)
                    );

                if (exists) {
                    return current;
                }

                return [
                    ...current,
                    result,
                ];
            }
        );

        /*
         * Broadcast the newly
         * created message to
         * other connected clients.
         */
        socket.emit(
            "chat:message",
            {
                conversationId:
                    convId,

                message: result,
            }
        );

        markMessageAsRead(
            socket,
            convId,
            senderId,
            result.id || (result as any)._id
        );
    };

    const handleTyping =
        () => {
            startTyping(
                socket,
                conversation.id,
                currentUserId
            );
        };

    const handleStopTyping =
        () => {
            stopTyping(
                socket,
                conversation.id,
                currentUserId
            );
        };

    return (
        <main className="flex min-w-0 flex-1 flex-col bg-white">
            <header className="flex h-16 shrink-0 items-center border-b px-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                    {title
                        .charAt(0)
                        .toUpperCase()}
                </div>

                <div className="ml-3">
                    <h2 className="font-semibold">
                        {title}
                    </h2>

                    <p className="text-xs text-slate-500">
                        {conversation.members.length}{" "}
                        members
                    </p>
                </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 px-5 py-6">
                {isLoading && (
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">
                        Loading messages...
                    </div>
                )}

                {isError && (
                    <div className="flex h-full items-center justify-center text-sm text-red-500">
                        Failed to load
                        messages.
                    </div>
                )}

                {!isLoading &&
                    !isError &&
                    allMessages.length ===
                    0 && (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center text-slate-400">
                                <MessageCircle
                                    size={32}
                                    className="mx-auto"
                                />

                                <p className="mt-3 text-sm">
                                    No messages yet.
                                </p>

                                <p className="text-xs">
                                    Start the
                                    conversation.
                                </p>
                            </div>
                        </div>
                    )}

                <div className="space-y-4">
                    {allMessages.map(
                        (message) => (
                            <MessageItem
                                key={message.id || (message as any)._id}
                                message={message}
                                currentUserId={
                                    currentUserId
                                }
                            />
                        )
                    )}

                    <TypingIndicator
                        userName={
                            typingUser?.name
                        }
                    />

                    <div
                        ref={messagesEndRef}
                    />
                </div>
            </div>

            <MessageInput
                onSend={handleSend}
                isSending={isSending}
                onTyping={handleTyping}
                onStopTyping={
                    handleStopTyping
                }
            />
        </main>
    );
}

function mergeMessages(
    apiMessages: Message[],
    realtimeMessages: Message[]
) {
    const map = new Map<
        string,
        Message
    >();

    for (const message of apiMessages) {
        map.set(
            message.id,
            message
        );
    }

    for (const message of realtimeMessages) {
        map.set(
            message.id,
            message
        );
    }

    return Array.from(
        map.values()
    ).sort(
        (a, b) =>
            new Date(
                a.createdAt
            ).getTime() -
            new Date(
                b.createdAt
            ).getTime()
    );
}

function getConversationTitle(
    conversation: Conversation,
    currentUserId: string
) {
    if (
        conversation.type ===
        "DIRECT"
    ) {
        const otherMember =
            conversation.members.find(
                (member) => {
                    const uid =
                        typeof member.user === "object" && member.user !== null
                            ? (member.user as any)._id || member.user.id
                            : member.user;
                    return uid && uid !== currentUserId;
                }
            );

        return (
            (otherMember?.user && typeof otherMember.user === "object"
                ? otherMember.user.name || otherMember.user.email
                : null) ?? "Direct Message"
        );
    }

    return (
        conversation.name ||
        "Group Conversation"
    );
}