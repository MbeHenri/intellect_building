import Comment from "./comment";

export interface PostSimple {
    uuid: string,
    img: string,
    publisher: string,
    date: Date,
    nbreComment: number,
    title: string,
    summary: string
}

export default interface Post {
    uuid: string,
    img: string,
    publisher: {
        img: string; login: string, name: string, linkLinkedIn: string, description: string
    },
    date: Date,
    comments: Array<Comment>,
    title: string,
    content: string,
    nextPost: { summary: string, uuid: string } | undefined | null,
    previousPost: { summary: string, uuid: string } | undefined | null,
}

