import { asyncStorage } from '../../generals/utils/AsyncStorageHelper';
import { base64 } from '../../generals/utils/Encoder';
import { logInfo } from '../../generals/utils/Logger';

export class BaseService {
    private readonly BASE_API: string = 'http://192.168.115.132:3000'
    private readonly CLIENT_ID: string = 'PUUu0JTL6EPQjTfIJeTsC9pMg2WtkTBGOSxr95AarJmBOcllqnao1lpoS9I2'
    private readonly CLIENT_SECRET: string = 'jHyENOcC2NWDmcKiY03v5ikwcIsd8NPD5VIFaX6t0L2h2jsaRcCnKXhv2A50'
    private readonly MAX_RETRY_TIME: number = 5
    private readonly SHOPEE_ACCESS_TOKEN_KEY: string = 'SHOPEE_ACCESS_TOKEN_KEY'

    // public static readonly instance: BaseService = new BaseService()

    private readonly failedAuthentication = {
        error: {
            code: 401,
            message: 'Authentication is failed'
        }
    }

    protected async fetchData<ResponseType>(request: ApiRequest, retry?: number): Promise<ApiResponse<ResponseType>> {
        try {

            let requestBody = {
                data: request.data,
            };

            let jsonRequest = JSON.stringify(requestBody);

            if (!request.token) {
                request.token = await asyncStorage.get(this.SHOPEE_ACCESS_TOKEN_KEY);
            }

            let response = await fetch(this.BASE_API + request.url, {
                method: request.method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${request.token}`
                },
                body: request.data ? jsonRequest : ''
            });

            let json = await response.json() as ApiResponse<ResponseType>;
            logInfo(`Response: ${JSON.stringify(json)}`);

            // authenticate failed due to expired_token, then retry again
            if (json.error?.code === 401) {
                if (retry && retry >= this.MAX_RETRY_TIME) {
                    return this.failedAuthentication;
                }

                retry = retry ? retry + 1 : 1;

                logInfo(`Retry fetch data: ${retry}`);
                let newToken = await this.getAccessToken();
                if (newToken.access_token) {
                    request.token = newToken.access_token;
                    return this.fetchData(request, retry);
                } else {
                    return this.failedAuthentication;
                }
            }

            return json;

        } catch (error) {
            logInfo(`Error: ${error}`);
            return {
                error: {
                    code: 500,
                    message: error as string
                }
            };
        }
    }

    protected async getAccessToken(): Promise<TokenResponse> {

        try {
            let userPassEncode = base64.toBase64String(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`);

            let response = await fetch(`${this.BASE_API}/api/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${userPassEncode}`
                },
            });

            let json = await response.json() as TokenResponse;

            if (json.access_token) {
                await asyncStorage.save(this.SHOPEE_ACCESS_TOKEN_KEY, json.access_token);
            }

            logInfo(`Response: ${JSON.stringify(json)}`);
            return json;
        } catch (error) {
            logInfo(`Error: ${error}`);
            return {
                error: {
                    code: 500,
                    message: error as string
                }
            };
        }
    }
}

export interface ApiResponse<T> {
    data?: T,

    // Error
    error?: HttpApiError
}

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequest {
    data?: any
    url: string
    token?: string | null
    method: ApiMethod
}

export interface TokenResponse {
    access_token?: string,

    // Error
    error?: HttpApiError
}

export interface HttpApiError {
    code: number;
    message: string | null
}
