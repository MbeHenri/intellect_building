
export interface ReplySimple {
    uuid: string
}

export interface Reply {
    uuid: string,
    nameOwner: string,
    date: Date,
    content: string,
}

export default interface Comment {
    uuid: string,
    nameOwner: string,
    date: Date,
    content: string,
    replies: Array<Reply>,
}