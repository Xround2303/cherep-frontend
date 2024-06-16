import { StoryFn } from "@storybook/vue3";
import { useDictionary } from "../use/useDictionary";
import { computed } from "vue";

const Template: StoryFn<any> = (args) => ({
  setup() {
    const { getDic, getDicTerm, getDicTermDef /*4 */ } = useDictionary("Langs", "ReportStatuses", "DbLogsLevels", "Users"); //1

    type User = { name: string, id: number };


    const dit = getDicTermDef<User, string>("Users", 1, "Default");
    const fullDictionary = getDic<User[]>("Users");
    const test = async (id: number) => getDicTerm<User>("Users", id);
    test(1).then((item) => { console.debug("console log: 1", item); if (item) item.id = 5 })
    test(1000).then((...args) => console.debug("console log: 2", args))
    test(4).then((...args) => console.debug("console log: 3", args))
    return { //9
      dit,
      fullDictionary,
    }
  },
  template: `<div>
        <div>Open your console</div>
        <div>Computed term with default: <strong>{{dit}}</strong> </div>
        <div>Full users dictionary {{fullDictionary}}</div>
    </div>`,
});

export const Default: StoryFn<any> = Template.bind({})

Default.args = {

}

export default {}
