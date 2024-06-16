import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import DictionariesRepository from "@/api/dictionaries";

type DICTS = Record<string, Array<any>>

export const useDictionaryStore = defineStore('dic', () => {
    let dictionaries: DICTS = reactive({}); // Словари
    let loading = ref(false); 
    let inLoading: string[] = [];
    let loadingPromise: null | Promise<void> = null; // удержания для того чтобы дождаться загрузки

    // загрузить словари
    const reloadDictionaries = async (dics: string[]) => { 
        loading.value = true // загрузка
        if (dics.every(dicsId => inLoading.includes(dicsId)) && loadingPromise) {
            return loadingPromise;
        }
        try {

            inLoading = [...new Set([...inLoading, ...dics])] // Словари которые в загрузке
            const {promise, resolve} = Promise.withResolvers<void>(); // Создаем ожидание
            loadingPromise = promise;

            const { data } = await DictionariesRepository.getDictionaries(dics); //9
            Object.assign(dictionaries, data);

            resolve(); //конец ожидания
        }
        finally {
            loading.value = false;
            inLoading = inLoading.filter(item => !dics.includes(item));
            loadingPromise = null;
        }
    }

    // загрузить конкретный словарь
    const reloadDict = async (dicId: string) => {
        loading.value = true;
        try {
            if (inLoading.includes(dicId) && loadingPromise) {
                return loadingPromise;
            }
            inLoading = [...new Set([...inLoading, dicId])] // Словари которые в загрузке

            const {promise, resolve} = Promise.withResolvers<void>(); // Создаем ожидание
            loadingPromise = promise;

            const { data } = await DictionariesRepository.getDictionary(dicId);
            dictionaries[dicId] = data;

            resolve(); // конец ожидания
        }
        finally {
            loading.value = false;
            inLoading = inLoading.filter(item => item !== dicId);
            loadingPromise = null;
        }
    }

    return {
        dictionaries,
        reloadDictionaries,
        reloadDict,
        loading
    }
})