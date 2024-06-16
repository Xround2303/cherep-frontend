import { ref, computed, toRaw } from "vue";
import { defineStore } from "pinia";
import useRepository, { TProfileData } from "@/api/profile";
import { CrudSuffix } from "@/common/types";

export default defineStore("profileStore", () =>
{
  const profileRepo = useRepository();

  const profileData = ref<TProfileData>();

  const checkProfileFetched = computed(() => profileData.value !== undefined);

  const checkActive = computed(() => profileData.value?.active || false);

  const userShortName = computed(() => {
    if (profileData.value === undefined) {
      return "Безымянный";
    } else {
      const { fname, lname, mname } = profileData.value;
      let result = lname;
      if (fname) {
        result += " " + fname.substring(0, 1).toUpperCase() + ".";
      }
      if (mname) {
        result += " " + mname.substring(0, 1).toUpperCase() + ".";
      }
      return result;
    }
  });

  const getFavWorkplace = (): string => {
    return profileData.value?.workplace || "Blank";
  };

  const dispatchFetchProfile = async (): Promise<string> => {
    if (!checkProfileFetched.value) {
      const { data } = await profileRepo.get();
      profileData.value = data;
      return Promise.resolve("fetch profile ok");
    } else {
      return Promise.resolve("already fetched profile");
    }
  };

  const clearProfile = () => {
    profileData.value = undefined;
  };

  const checkHasPermission = (workplace: string, permission: CrudSuffix = "view"): boolean => {
    const profilePermissions = profileData.value?.permissions || [];
    return profilePermissions.includes(`${workplace}/${permission}`);
  };

  const getProfile = () => dispatchFetchProfile().then(() => toRaw(profileData.value as TProfileData));

  return {
    checkProfileFetched,
    checkActive,
    checkHasPermission,
    userShortName,
    getFavWorkplace,
    dispatchFetchProfile,
    getProfile,
    clearProfile
  };
});
