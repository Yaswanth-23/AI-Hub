import api from "./api";

export const getConversations = async () => {
  const { data } = await api.get("/conversations");
  return data;
};

export const getConversationById = async (id) => {
  const { data } = await api.get(`/conversations/${id}`);
  return data;
};

export const sendMessage = async (conversationId, content, provider) => {
  const res = await api.post(`/conversations/${conversationId}/messages`, {
    content,
    provider,
  });
  return res.data;
};