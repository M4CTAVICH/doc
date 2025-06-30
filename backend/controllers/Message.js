import {
  sendMessage,
  getMessagesForUser,
  getUnreadMessageCount,
  markMessageAsRead,
} from "../models/Message.js";

export const postMessage = async (req, res) => {
  try {
    const { to_user_id, patient_id, content } = req.body;
    const from_user_id = req.user.id;

    if (!to_user_id || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const result = await sendMessage({
      from_user_id,
      to_user_id,
      patient_id,
      content,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};
export const fetchMessages = async (req, res) => {
  try {
    const user_id = req.user.id;
    const messages = await getMessagesForUser(user_id);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const fetchUnreadCount = async (req, res) => {
  try {
    const user_id = req.user.id;
    const count = await getUnreadMessageCount(user_id);
    res.json({ unread: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await markMessageAsRead(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
