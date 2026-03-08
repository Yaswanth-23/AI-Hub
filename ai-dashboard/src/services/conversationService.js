import api from "@api/api";

/* =========================
   💬 GET ALL CONVERSATIONS
========================= */
export const getConversations = async () => {
  const { data } = await api.get("/conversations");
  return data;
};

/* =========================
   💬 GET CONVERSATION BY ID
========================= */
export const getConversationById = async (id) => {
  const { data } = await api.get(`/conversations/${id}`);
  return data;
};

/* =========================
   💬 SEND MESSAGE
========================= */
export const sendMessage = async (conversationId, content, provider) => {
  const { data } = await api.post(
    `/conversations/${conversationId}/messages`,
    {
      content,
      provider,
    }
  );

  return data;
};