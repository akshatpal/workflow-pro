export interface ChatUser {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  profilePic?: string;
}

export interface ConversationMember {
  user: ChatUser;
  joinedAt: string;
  lastReadMessage?: string | null;
}

export interface Reaction {
  user: string;
  emoji: string;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  mimeType?: string;
  fileSize?: number;
}

export interface Message {
  id: string;
  conversation: string;
  sender: ChatUser;
  message: string;
  attachments: Attachment[];
  reactions: Reaction[];
  edited: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  type: "DIRECT" | "GROUP" | "PROJECT";
  members: ConversationMember[];
  project?: string | null;
  lastMessage?: Message | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConversationRequest {
  name?: string;
  avatar?: string;
  type: "DIRECT" | "GROUP" | "PROJECT";
  members: string[];
  project?: string;
}

export interface SendMessageRequest {
  conversation: string;
  sender: string;
  message: string;
  attachments?: string[];
}

export interface UpdateMessageRequest {
  message: string;
}