import { HttpApi } from './HttpApi';

export class AuthApi extends HttpApi {
  async tokenBySession(data: {
    session_id: string;
    ip_address: string;
    user_agent: string;
  })
    : Promise<{
      access_token: string;
      token_type: string;
      expires_in: number;
    }> {
    const response = await this.http.post('/auth/token_by_session', data).then(x => x.data);
    return response;
  }
}
