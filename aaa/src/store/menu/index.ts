import { defineStore } from "pinia"
import { HintedString } from "primevue/ts-helpers"
import { ref } from "vue"

export type Badge = {
  ref: string,
  type: HintedString<"success" | "secondary" | "info" | "warning" | "danger" | "contrast">,
  content: string | number
}

export type TStateData = {
  currentNavItem?: string,
  badges: Badge[],
}

export default defineStore('menuStore', () => {
  const state = ref<TStateData>({
    currentNavItem: '',
    badges: []
  });

  const setMenuBadges = (badges: Badge[]) => {
    state.value.badges = badges;
  }

  const setMenuBadge = (badge: Badge) => {
    const index = getMenuBadgeIndex(badge.ref);
    if (index != -1) {
      state.value.badges.splice(index, 1, badge);
    } else {
      state.value.badges.push(badge);
    }
  }

  const getMenuBadgeIndex = (ref: string) => {
    return state.value.badges.findIndex(x => x.ref === ref)
  }

  const getMenuBadge = (ref: string) => {
    return state.value.badges.find(x => x.ref === ref)
  }

  const setCurrentNavItem = (nav?: string) => state.value.currentNavItem = nav;

  const getCurrentNavItem = () => state.value.currentNavItem;

  return {
    setMenuBadges,
    setMenuBadge,
    getMenuBadge,
    setCurrentNavItem,
    getCurrentNavItem,
  }
})
