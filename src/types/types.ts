export type Meme = {
    id: string
    name: string
    blank: string
    lines: number
    overlays: number
}

export type ModalState = Pick<Meme, 'id' | 'name' | 'blank' |  'lines'>

export type ModalProps = ModalState & {
    handleCloseModal: () => void
}

export type TextInput = {
    [key: number]: string
}


