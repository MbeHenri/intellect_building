import { Category } from "../models/category";
import Comment, { CommentSimple } from "../models/comment";
import Post, { PostSimple } from "../models/post";
import Product, { ProductSimple } from "../models/product";
import { getIntellectRepository } from "../repositories/IntellectBuilding";
import IntellectRepository from "../repositories/IntellectBuilding/repository";


class BaseService {
    base_rep: IntellectRepository;

    constructor(user?: any) {
        this.base_rep = getIntellectRepository("fake");
    }

    async getPostCategories(): Promise<Category[]> {
        return await this.base_rep.getPostCategories()
    }

    async getPosts(limit?: number, offset?: number, searchText?: string, uuidCategory?: string, order?: string): Promise<PostSimple[]> {
        const res: PostSimple[] = await this.base_rep.getPosts(limit, offset, searchText, uuidCategory, order)
        return res.slice(undefined, limit)
    }

    async getPopularPosts(limit?: number): Promise<PostSimple[]> {
        return await this.base_rep.getPopularPosts(limit)
    }

    async getPost(uuid: string): Promise<Post> {
        return await this.base_rep.getPost(uuid)
    }

    async getComment(comment: CommentSimple): Promise<Comment> {
        return await this.base_rep.getComment(comment.uuid)
    }

    async getTrainings(limit?: number, offset?: number, searchText?: string): Promise<ProductSimple[]> {
        return await this.base_rep.getTrainings(limit, offset, searchText)
    }

    async getTraining(uuid: string): Promise<Product> {
        return await this.base_rep.getTraining(uuid)
    }
}

export default BaseService;
