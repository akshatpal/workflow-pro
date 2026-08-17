import { useState, useMemo } from "react";
import { X, Search, Users, User as UserIcon, Check, Loader2, MessageSquarePlus } from "lucide-react";
import toast from "react-hot-toast";

import { useGetUsersQuery } from "@/features/task/taskApi";
import { useCreateConversationMutation } from "../chatApi";
import type { Conversation } from "../chat.types";

interface Props {
  open: boolean;
  onClose: () => void;
  onConversationCreated: (conversation: Conversation) => void;
  currentUserId: string;
}

type TabType = "DIRECT" | "GROUP";

export default function NewConversationModal({
  open,
  onClose,
  onConversationCreated,
  currentUserId,
}: Props) {
  const [tab, setTab] = useState<TabType>("DIRECT");
  const [search, setSearch] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const { data: users = [], isLoading: isLoadingUsers } = useGetUsersQuery();
  const [createConversation, { isLoading: isCreating }] =
    useCreateConversationMutation();

  // Filter out current user from potential targets
  const availableUsers = useMemo(() => {
    return users.filter((u) => {
      const uid = u.id || (u as any)._id;
      return uid && uid !== currentUserId;
    });
  }, [users, currentUserId]);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return availableUsers;
    const lower = search.toLowerCase();
    return availableUsers.filter(
      (u) =>
        u.name?.toLowerCase().includes(lower) ||
        u.email?.toLowerCase().includes(lower)
    );
  }, [availableUsers, search]);

  if (!open) return null;

  const handleStartDirectChat = async (targetUserId: string) => {
    if (!currentUserId) {
      toast.error("User session not found");
      return;
    }

    try {
      const conv = await createConversation({
        type: "DIRECT",
        members: [currentUserId, targetUserId],
      }).unwrap();

      toast.success("Conversation started");
      onConversationCreated(conv);
      handleClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to start conversation. Please try again."
      );
    }
  };

  const handleToggleUserSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }
    if (selectedUserIds.length === 0) {
      toast.error("Please select at least one user to add to the group");
      return;
    }
    if (!currentUserId) {
      toast.error("User session not found");
      return;
    }

    try {
      const conv = await createConversation({
        type: "GROUP",
        name: groupName.trim(),
        members: [currentUserId, ...selectedUserIds],
      }).unwrap();

      toast.success("Group created successfully");
      onConversationCreated(conv);
      handleClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to create group. Please try again."
      );
    }
  };

  const handleClose = () => {
    setSearch("");
    setGroupName("");
    setSelectedUserIds([]);
    setTab("DIRECT");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div
        className="flex w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100 max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <MessageSquarePlus size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                New Conversation
              </h2>
              <p className="text-xs text-slate-500">
                Start a direct message or create a group chat
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b bg-slate-50 px-6 pt-2">
          <button
            type="button"
            onClick={() => setTab("DIRECT")}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              tab === "DIRECT"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <UserIcon size={16} />
            Direct Message
          </button>
          <button
            type="button"
            onClick={() => setTab("GROUP")}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              tab === "GROUP"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <Users size={16} />
            Group Chat
            {selectedUserIds.length > 0 && (
              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                {selectedUserIds.length}
              </span>
            )}
          </button>
        </div>

        {/* Group form details if tab is GROUP */}
        {tab === "GROUP" && (
          <div className="border-b bg-slate-50/50 p-4 px-6 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Group Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Team, Project Alpha"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {/* Search Bar */}
        <div className="p-4 px-6 border-b">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search team members by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto px-6 py-3 min-h-[220px] max-h-[340px] divide-y divide-slate-100">
          {isLoadingUsers ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2">
              <Loader2 className="animate-spin text-blue-500" size={24} />
              <p className="text-xs">Loading team members...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
              <Users size={32} className="mb-2 text-slate-300" />
              <p className="text-sm font-medium text-slate-600">No users found</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {search ? "Try searching for a different name or email" : "No other users available in workspace"}
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => {
              const uid = user.id || (user as any)._id;
              const isSelected = selectedUserIds.includes(uid);

              if (tab === "DIRECT") {
                return (
                  <button
                    key={uid}
                    type="button"
                    disabled={isCreating}
                    onClick={() => handleStartDirectChat(uid)}
                    className="flex w-full items-center gap-3.5 py-3 text-left transition hover:bg-slate-50 rounded-xl px-2.5 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700 text-sm group-hover:bg-blue-600 group-hover:text-white transition">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition">
                      Chat &rarr;
                    </span>
                  </button>
                );
              }

              return (
                <div
                  key={uid}
                  onClick={() => handleToggleUserSelection(uid)}
                  className={`flex cursor-pointer items-center gap-3.5 py-3 text-left transition rounded-xl px-2.5 ${
                    isSelected ? "bg-blue-50/80" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700 text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded border transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer for Group */}
        {tab === "GROUP" && (
          <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-4">
            <span className="text-xs text-slate-500">
              {selectedUserIds.length} member
              {selectedUserIds.length !== 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isCreating || selectedUserIds.length === 0 || !groupName.trim()}
                onClick={handleCreateGroup}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Group"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
