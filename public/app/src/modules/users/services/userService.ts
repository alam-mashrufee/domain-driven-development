
import { BaseAPI } from "../../../shared/infra/services/BaseAPI";
import { right, left } from "../../../shared/core/Either";
import { Result } from "../../../shared/core/Result";
import { APIResponse } from "../../../shared/infra/services/APIResponse";
import { LoginDTO } from "../dtos/loginDTO";
import { User } from "../models/user";
import { IAuthService } from "./authService";

export interface IUsersService {
  getCurrentUserProfile (): Promise<User>;
  createUser (email: string, username: string, password: string): Promise<APIResponse<void>>;
  login (username: string, password: string): Promise<APIResponse<LoginDTO>>;
  logout (store: any): Promise<any>;
}

export class UsersService extends BaseAPI implements IUsersService {

  constructor (authService: IAuthService) {
    super(authService);
  }

  async getCurrentUserProfile (): Promise<User> {
    const response = await this.get('/users/me', null, { 
      authorization: this.authService.getToken('access-token') 
    });
    return response.data.user as User;
  }

  public async logout (store: any): Promise<any> {

  }

  async login (username: string, password: string): Promise<APIResponse<LoginDTO>> {
    try {
      const response = await this.post('/users/login', { username, password });
      const dto: LoginDTO = response.data as LoginDTO;
      this.authService.setToken('access-token', dto.accessToken);
      this.authService.setToken('refresh-token', dto.refreshToken);
      return right(Result.ok<LoginDTO>(dto));
    } catch (err) {
      return left(err.response.data.message)
    }
  }

  async createUser (email: string, username: string, password: string): Promise<APIResponse<void>> {
    try {
      await this.post('/users', { email, username, password });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response.data.message)
    }
  }
}



