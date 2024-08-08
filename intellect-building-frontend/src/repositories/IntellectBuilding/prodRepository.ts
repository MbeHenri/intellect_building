import { API_BASE_URL } from "../../config";
import { limitContent } from "../../utils/function";
import IntellectRepository from "./repository";

class ProdIntellectRepository extends IntellectRepository {

    async getPosts(limit?: number | undefined, offset?: number | undefined, searchText?: string | undefined, uuidCategory?: string | undefined, order?: string | undefined) {
        const myHeaders = new Headers();

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        const results: any[] = await fetch(`${API_BASE_URL}/publications`, requestOptions)
            .then((response) => response.json())

        const datas = await Promise.all(
            results.slice(undefined, limit).map(async (post) => {
                const user = await this.getUser(`${post.user}`).then((response) => response.json())
                return {
                    uuid: `${post.id}`,
                    img: "",
                    publisher: user.name,
                    date: new Date(),
                    nbreComment: 0,
                    title: "anything",
                    summary: limitContent(post.content)
                }
            })
        )
        return datas
    }


    async getPost(uuid: string) {

        const myHeaders = new Headers();
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        const post = await fetch(`${API_BASE_URL}/publications/${uuid}`, requestOptions)
            .then((response) => response.json())

        const user = await this.getUser(`${post.user}`)
        const profile = await this.getUser(`${user.profile}`)
        return {
            uuid: `${post.id}`,
            img: "",
            publisher: { img: "", login: user.name, name: profile.name, linkLinkedIn: "", description: profile.description },
            date: new Date(),
            comments: [],
            title: "anything",
            content: post.content
        }
    }

    async getPostCategories() {
        const myHeaders = new Headers();
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        return await fetch(`${API_BASE_URL}/categories`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                const results: any[] = data
                return results.map((cat) => {
                    return {
                        uuid: `${cat.id}`,
                        title: cat.label,
                        totalPosts: cat.publications.length
                    }
                })
            })
    }

    async getTraining(uuid: string) {
        const myHeaders = new Headers();
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        return await fetch(`${API_BASE_URL}/categories/${uuid}`, requestOptions)
            .then((response) => response.json())
            .then((training) => {
                return {
                    uuid: `${training.id}`,
                    img: "",
                    name: training.name,
                    price: training.price,
                    description: training.description,
                    summary: "",
                    infos: ""
                }
            })
    }

    async getTrainings(limit?: number | undefined, offset?: number | undefined, searchText?: string | undefined) {
        const myHeaders = new Headers();
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        return await fetch(`${API_BASE_URL}/categories`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                const results: any[] = data
                return results.slice(undefined, limit).map((training) => {
                    return {
                        uuid: `${training.id}`,
                        img: "",
                        name: training.name,
                        price: training.price,
                        description: training.description,
                        summary: "",
                        infos: ""
                    }
                })
            })
    }

    async getUser(uuid: string) {
        const myHeaders = new Headers();

        const requestOptions = {
            method: "GET",
            headers: myHeaders
        };

        return await fetch(`${API_BASE_URL}/api/users/${uuid}`, requestOptions)
            .then((response) => response.json())
    }

    async getProfile(uuid: string) {
        const myHeaders = new Headers();

        const requestOptions = {
            method: "GET",
            headers: myHeaders
        };

        return await fetch(`${API_BASE_URL}/api/profiles/${uuid}`, requestOptions)
            .then((response) => response.json())
    }


}

export default ProdIntellectRepository;
