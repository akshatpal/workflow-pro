import { Router } from "express";

import { ChatController } from "../controller/chat.controller.js";

import { authenticate } from "../../../common/middleware/auth.middleware.js";

import { validate } from "../../../common/middleware/validate.middleware.js";

import {
  createConversationSchema,
  sendMessageSchema,
  updateMessageSchema,
} from "../validation/chat.validation.js";

const router = Router();

router.use(authenticate);

router.post(
  "/conversations",
  validate(createConversationSchema),
  ChatController.createConversation
);

router.get(
  "/conversations/:userId",
  ChatController.getConversations
);

router.get(
  "/messages/:conversationId",
  ChatController.getMessages
);

router.post(
  "/messages",
  validate(sendMessageSchema),
  ChatController.sendMessage
);

router.patch(
  "/messages/:id",
  validate(updateMessageSchema),
  ChatController.updateMessage
);

router.patch(
  "/messages/:id/reaction",
  ChatController.addReaction
);

router.delete(
  "/messages/:id/reaction",
  ChatController.removeReaction
);

router.delete(
  "/messages/:id",
  ChatController.deleteMessage
);

export default router;