<script setup lang="ts">
import PrimePassword from "primevue/password";
import { computedAttrsExcept } from "@/utils/AttrsFilter";
import {useAttrs} from "vue";

const pt = {
  root: "sv-password w-full"
};

defineOptions({ inheritAttrs: false });
const allowedAttrs = computedAttrsExcept(["pt"], useAttrs());
</script>

<template>
  <PrimePassword
    v-bind="allowedAttrs"
    :pt="pt"
  >
    <template
      v-for="(_, name, index) in ($slots as {})"
      #[name]="scope"
      :key="index"
    >
      <slot
        :name="name"
        v-bind="{ scope }"
      />
    </template>
  </PrimePassword>
</template>
<style>
/*
Фикс! Праймовскй компонент "пароль" не принимает в pt "input" классы, такая запись не работает: pt = {input: "w-100"}
Возможно, ошибка в либе.
 */
.sv-password input {
  width: 100%;
}
</style>