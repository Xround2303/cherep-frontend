export type IProps = {
  items: Item[]
}

export type ICollapseProps = {
  collapsed?: boolean
}

export interface Item {
    reference_name: string,
    children?: Item[],
    icon?: string,
    isRoot?: boolean,
    isExpand?: boolean,
    isMenu?: boolean,
    workplace?: string,
    showIcon?: boolean,
    collapsed?: boolean
}
