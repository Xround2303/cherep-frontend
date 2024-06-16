import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { setLocale } from "@vee-validate/i18n";
import useEnvRepository, { TEnvData } from "@/api/env";
import constants from "@/common/constants";
import { ILocale } from "@/store/env/index.types";
import { Composer, VueI18n } from "vue-i18n";
import { useContextManager } from "@/plugins/contextManager";

const contextManager = useContextManager();

export type TTheme = "light" | "dark"

export type TStateData = {
    lang: string,
    theme: TTheme,
}

export default defineStore("envStore", () => {
    const envRepo = useEnvRepository();

    const state = ref<TStateData>({
        lang: localStorage.getItem("_ANONYM_LOCALE_") || "ru",
        theme: localStorage.getItem("_ANONYM_THEME_") as TTheme || "light",
    });

    const frontendVersion = ref<string>(__APP_VERSION__);

    const envData = ref<TEnvData | null>(null);
    const envFetched = computed<boolean>(() => envData.value !== null);

    const dispatchInit = async () => {
        setState();
        await fetchEnv();
    };

    const setState = () => {
        console.debug("env set lang");
        setLang(state.value.lang);
        console.debug("env set theme");
        setTheme(state.value.theme);
    };

    const fetchEnv = async () => {
        if (envFetched.value === false) {
            const { data } = await envRepo.get();
            envData.value = data;
        }
    };

    const setLang = (lang: string) => {
        if (localeCodes.value.find(x => x == lang)) {
            state.value.lang = lang;
            localStorage.setItem("_ANONYM_LOCALE_", lang);
            if (contextManager.i18n().mode === 'legacy') {
                (contextManager.i18n().global as unknown as VueI18n).locale = lang
            } else {
                (contextManager.i18n().global as unknown as Composer).locale.value = lang
            }
            setLocale(lang);
        }
    };

    const getTheme = computed(() => state.value.theme);
    const setTheme = (theme: TTheme) => {
        //TODO: Fix checking
        if (["light", "dark"].find(x => x == theme)) {
            state.value.theme = theme;
            localStorage.setItem("_ANONYM_THEME_", theme);
        }
    };

    const setFrontendVersion = (version: string) => {
        frontendVersion.value = version;
    };

    const getAppTitle = computed(() => envData.value?.features["design.appTitle"] || constants.defaultAppTitle);
    const getAppTitleSplit = computed(() => envData.value?.features["design.appTitleSplit"] || constants.defaultAppTitleSplit);
    const getAppLogo = computed(() => envData.value?.features[`design.appLogo.${getTheme.value}`] || constants.defaultAppLogo[getTheme.value]);
    const getFooterHref = computed(() => envData.value?.features["footer.href"] || constants.defaultFooterHref);
    const getFooterHrefText = computed(() => envData.value?.features["footer.hrefText"] || constants.defaultFooterHrefText);
    const getVersions = computed(() => [{ name: "Frontend", version: frontendVersion.value }, {
        name: "Backend",
        version: envData.value?.version
    }, ...(envData.value?.features["versions"] || [])]);
    const domain = computed(() => envData.value?.domain || constants.defaultDomain);
    const locales = computed<ILocale[]>(() => envData.value?.locales ?? [{ name: "Русский", code: "ru", bcp47: "ru-RU" }, { name: "English", code: "en", bcp47: "en-US" }]);
    const localeCodes = computed<string[]>(() => locales.value.map(locale => locale.code));
    const langSelected = computed(() => state.value.lang);

    return {
        envData,
        envFetched,
        setState,
        dispatchInit,
        fetchEnv,
        langSelected,
        setLang,
        getTheme,
        setTheme,
        setFrontendVersion,
        getAppTitle,
        getAppTitleSplit,
        getAppLogo,
        getFooterHref,
        getFooterHrefText,
        getVersions,
        domain,
        locales,
        localeCodes
    };
});
