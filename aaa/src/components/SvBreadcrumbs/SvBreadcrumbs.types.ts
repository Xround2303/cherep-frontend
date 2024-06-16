import {MenuItem} from "primevue/menuitem";

export type IProps = {
    items: MenuItem[],
    limitCountPageAfterDots?: number,
    limitCountPageWithoutDots?: number,
}