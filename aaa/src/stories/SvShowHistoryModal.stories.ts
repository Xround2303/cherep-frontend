import { StoryFn, Meta } from "@storybook/vue3";
import SvShowHistoryModal from "../components/SvShowHistoryModal/SvShowHistoryModal.vue";
import store from "../store/userHistory/Table";
import {computed, onMounted, ref, watch} from "vue";

export default {
    title: "Form/SvShowHistoryModal",
    component: SvShowHistoryModal,
    argTypes: {

    }
} as Meta<typeof SvShowHistoryModal>;

const Template: StoryFn<typeof SvShowHistoryModal> = (args) => ({
    components: { SvShowHistoryModal },
    setup() {
        
        const itemId = computed(() => args.itemId);
        watch(itemId, () => store.mutatorItemId(args.itemId));
        onMounted(() => store.mutatorItemId(args.itemId));

        return { args, store };
    },
    template: "<SvShowHistoryModal :store=\"store\"/>",
});

export const Default: StoryFn<typeof SvShowHistoryModal> = Template.bind({});

Default.args = {
    itemId: 1
};