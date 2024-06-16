import { computed, toRaw } from 'vue';
// import Store from './../store'; // TODO NIKITA TOROHOV
import { useDictionaryStore } from "@/store/dictionary";
import { cloneDeep } from 'lodash';

type ArraySplit<T> = T extends [infer A, ...infer Other] ?
    A extends string ? Other extends string[] ?
    A | ArraySplit<Other> : never : never : never;

type DicNameType<Dict extends string[]> = ArraySplit<Dict> extends never ? string : ArraySplit<Dict>


const useDictionary = <Dict extends string[]>(...dicNames: Dict) => {
    const store = useDictionaryStore() // store словаря

    // TODO NIKITA TOROHOV
    //const locale = computed(() => Store.getters.getLocale);

    // watch(
    //     // () => locale.value,
    //     () => {
    //         store.reloadDictionaries(dicNames);
    //     },
    // );

    store.reloadDictionaries(dicNames); //3

    // получить словарь, если не существует, вернуть пустой массив
    const getDic = <T>(dicId: DicNameType<Dict>) => {
        store.reloadDict(dicId); // обновить словарь 

        if (store.dictionaries[dicId] === undefined) {
            store.reloadDict(dicId); // обновить словарь если пусто
        }

        return computed<T | undefined>(() => { //реактивно вернуть словарь по dicId
            return store.dictionaries[dicId] as T | undefined;
        }) //7
    };

    // получить словарную статью, если не существует, вернуть null
    const getDicTerm = async <T>(dicId: DicNameType<Dict>, itemId: number | string | symbol): Promise<T|null> => {
        store.reloadDict(dicId); // обновить словарь

        const get = () => { // получить словарную статью
            let dictionary = store.dictionaries[dicId] ?? []; //если нет словаря то вернуть пустой
            let dicItem = dictionary.find((item) => item.id == itemId); //найти статью по ключу
    
            if (dicItem === undefined) { 
                return null
            };
    
            return cloneDeep(toRaw(dicItem)) as T //получить статью
        }

        if (store.dictionaries[dicId] === undefined){
            return store.reloadDict(dicId).then(() => get());
        }
        return get();
    };

    // проверить есть ли ключ в словаре
    const checkDic = (dicId: DicNameType<Dict>, itemId?: number | string | symbol) => {
        if (store.dictionaries[dicId] === undefined) return false;
        if(itemId === undefined) {
            return false;
        }
        const dicItem = store.dictionaries[dicId].find((item) => item.id == itemId);
        return dicItem !== undefined;
    };

    // получить словарную статью, если не существует, вернуть сам ключ
    const getDicTermNvl = (dicId: DicNameType<Dict>, itemId: number | string | symbol) => {
        return getDicTermDef(dicId, itemId, itemId);
    };

    // получить словарную статью, если не существует, вернуть указаное значение в default
    const getDicTermDef = <T, Def>(dicId: DicNameType<Dict>, itemId: number | string | symbol, def: Def) => {
        return computed<T | Def>(() => { //реактивно вернуть 
            let dicItem = store.dictionaries[dicId];
            dicItem = dicItem?.find((item) => item.id == itemId); // если есть словарь найти элемент

            if (dicItem === undefined) return def as Def; // default значение

            return dicItem as T
        });
    };


    return {
        getDic,
        getDicTerm,
        checkDic,
        getDicTermNvl,
        getDicTermDef,
    };
};

export { useDictionary };