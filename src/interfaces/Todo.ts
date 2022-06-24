export interface List {
    id: string
    title: string
    listItems: Array<ListItem>
}

export interface ListItem {
    description: string
    complete: boolean
    id: number
}