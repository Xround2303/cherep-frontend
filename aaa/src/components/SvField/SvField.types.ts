export enum EnumErrorVisible {
    bottom = "bottom",
    label = "label"
}
export type IErrorVisible = EnumErrorVisible.bottom | EnumErrorVisible.label;

export type IProps = {
    label: string,
    errorMessages?: string,
    hint?: string,
    typeErrorVisible?: IErrorVisible,
    required?: boolean
}

export type ISlots = {
    default: (props: {
        invalid: boolean
    }) => any,
    title: () => any
}