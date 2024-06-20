interface UserProps{
    id: number
    userId: string
    name: string
    email: string
    phone?: string
    type: string
}

interface ProductProps{
    id: number
    name: string
    type: string
    description: string
    image?: Blob
    checklist?: ChecklistProps
}

interface SalesProps{
    id: number
    salesNumber: number
    createdDate?: Date
    user?: UserProps
    product?: ProductProps 
    checklist?: ChecklistProps[]
}

interface ChecklistProps{
    id: number
    title: string
    description: string
    items?: ItemChecklistProps[]
}

interface ItemChecklistProps{
    id: number
    description: string
}