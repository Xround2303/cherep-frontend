<script setup lang="ts">
import SvPage from "@/components/SvPage/SvPage.vue";
import {useNotification} from "@/use/useNotification";
useNotification().success("test notify");
</script>

<template>
  <sv-page title="Veee, I'm a Roles page!">
    <div class="p-3 bg-blue-400">
      <router-link class="text-white p-3" :to="{ name: 'Users'}">Users_1</router-link>
      <router-link class="text-white p-3" :to="{ name: 'Roles'}">Roles</router-link>
      <router-link class="text-white p-3" :to="{ name: 'Profile'}">Profile</router-link>
    </div>
  </sv-page>
</template>
