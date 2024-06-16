import { useContextManager } from "@/plugins/contextManager";

const resource = "/dictionaries";

export default {
  getDictionaries(dics: string[]) {
    return useContextManager().axios().get(`${resource}/`, { params: { dics } });
  },
  getDictionary(dic: string) {
    return useContextManager().axios().get(`${resource}/${dic}`, { params: { dic: dic } });
  },
};
