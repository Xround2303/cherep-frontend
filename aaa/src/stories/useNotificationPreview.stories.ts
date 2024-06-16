
import { StoryFn, Meta } from "@storybook/vue3";
import Layout from "../pages/Layout.vue";
import Avatar from "primevue/avatar";
import SvButton from "../components/primevue-wrappers/SvButton.vue";
import Toast from "primevue/toast";
import { useNotification } from "../use/useNotification";
export default {
  title: "composables/useNotification",
  component: Layout,
  argTypes: {},
} as Meta<any>;

const Template: StoryFn<any> = (args) => ({
  components: { Toast, SvButton, Avatar },
  methods: {},
  setup() {
    const notification = useNotification();
    function showToast(type: "error" | "success" = "success", group: string) {
      notification.error("error", { severity: type, group, life: undefined });
    }
    return { args, showToast };
  },
  template: `
    <div>
      <Toast position="top-left" group="bc" />
      <Toast position="top-right" group="cc" />
      <Toast position="bottom-center" group="ec">
        <template #message="slotProps">
          <div class="flex flex-column align-items-start" style="flex: 1">
            <div class="flex align-items-center gap-2">
              <Avatar image="https://i.pravatar.cc/300" shape="circle" />
              <span class="font-bold text-900">Amy Elsner</span>
            </div>
            <div class="font-medium text-lg my-3 text-900">{{ slotProps.message.summary }}</div>
            <SvButton class="p-button-sm" label="Reply"></SvButton>
          </div>
        </template>
      </Toast>
      <div class="flex gap-4">
        <div class="flex gap-1 flex-column">
          <SvButton @click="showToast('success', 'bc')">Success BC</SvButton>
          <SvButton @click="showToast('error','bc')" severity="danger">Error BC</SvButton>
        </div>
        <div class="flex gap-1 flex-column">
          <SvButton @click="showToast('success', 'cc')">Success GROUP CC</SvButton>
          <SvButton @click="showToast('error','cc')" severity="danger">Danger GROUP CC</SvButton>
        </div>
        <div>
          <SvButton @click="showToast('success', 'ec')">Template with GROUP EC</SvButton>
        </div>
      </div>
    </div>`,
});

export const Default: StoryFn<any> = Template.bind({});

Default.args = {};
