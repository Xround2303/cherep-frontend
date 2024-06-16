import {Placement} from "@popperjs/core/lib/enums";

export type IProps = {
    placement?: Placement,
    arrow?: boolean
}

export type ISlots = {
    default: () => any,
    icon: () => any
}