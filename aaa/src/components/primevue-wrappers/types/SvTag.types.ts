import {TagProps} from "primevue/tag";

export type IPropsAdditional = {
    outline?: boolean
}

export type IProps = TagProps & IPropsAdditional;