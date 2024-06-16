export type IProps = {
    width?: string,
    isShowFooter?: boolean
}

export type ISlots = {
    container: () => any,
    activator: (props: {
        onOpenDialog: () => any
    }) => any,
    footer: (props: {
        onCloseDialog: () => any,
    }) => any,
    default: () => any
}