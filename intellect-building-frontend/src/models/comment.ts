
export interface Reply {
    uuid: string,
    owner: {
        name: string,
        img: string,
    }
    date: Date,
    content: string,
}

export interface CommentSimple {
    uuid: string,
    owner: {
        name: string,
        img: string,
    }
    date: Date,
    content: string,
    nbreReplies: number,
}

export default interface Comment {
    uuid: string,
    owner: {
        name: string,
        img: string,
    }
    date: Date,
    content: string,
    replies: Array<Reply>,
}