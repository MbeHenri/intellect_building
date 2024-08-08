import { UserAuth } from "../models/user";
import { getIntellectRepository } from "../repositories/IntellectBuilding";
import IntellectRepository from "../repositories/IntellectBuilding/repository";


class LoginService {
    base_rep: IntellectRepository;

    constructor() {
        this.base_rep = getIntellectRepository("fake");
    }

    async getToken(login: string, password: string): Promise<UserAuth> {
        return await this.base_rep.getToken(login, password)
    }
}

export default LoginService;
