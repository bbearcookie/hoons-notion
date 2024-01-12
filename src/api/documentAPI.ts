import { request } from "@/utils/request";

const documentAPI = {
  getDocument: async (id: string) => {
    return await request(`/documents/${id}`);
  },
  getDocuments: async () => {
    return await request("/documents");
  },
};

export default documentAPI;
