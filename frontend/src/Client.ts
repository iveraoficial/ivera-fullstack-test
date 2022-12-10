import {
    createIError
} from '../../schema/shared';
import {
    ICharacters,
    IError,
    IGetCharactersOffsetAndLimitQueryParameters,
    IListCharacters,
    ILogsResult,
    IRegisterUser,
    IRequest,
    ISignInUser,
    RequestResult
} from '../../shared';

export default class Client {
    readonly #baseUrl;
    public constructor({baseUrl}:{
        baseUrl: string;
    }){
        this.#baseUrl = baseUrl;
    }
    public async registerUser(username: string,password: string) {
        return this.#request<IRegisterUser>('/user','POST',{
            username,
            password
        });
    }
    public getCharacter(characterId: string): Promise<ICharacters | IError> {
        return this.#request(
            `/characters/${characterId}`,
            'GET'
        );
    }
    public logs({
        authId,
        offset,
        limit
    }:{
        authId: string;
        offset: string;
        limit: string;
    }): Promise<ILogsResult | IError> {
        const searchParams = new URLSearchParams();
        searchParams.set('offset',offset);
        searchParams.set('limit',limit);
        return this.#request(
            `/logs/${authId}`,
            'GET',
            undefined,
            searchParams
        );
    }
    public listCharacters(params: IGetCharactersOffsetAndLimitQueryParameters){
        const searchParams = new URLSearchParams();
        searchParams.set('offset',params.offset.toString());
        searchParams.set('limit',params.limit.toString());
        searchParams.set('nameStartsWith',params.nameStartsWith.toString());
        return this.#request<IListCharacters>(
            '/characters',
            'GET',
            undefined,
            searchParams
        );
    }
    public async logIn(username: string, password: string) {
        return await this.#request<ISignInUser>('/auth','POST',{
            username,
            password
        });
    }
    async #request<T extends IRequest<any>>(
        pathname: string,
        method: string,
        data: T | undefined = undefined,
        searchParams: URLSearchParams = new URLSearchParams()
    ): Promise<RequestResult<T> | IError> {
        const url = new URL(pathname,this.#baseUrl);
        for(const [k,v] of searchParams){
            url.searchParams.set(k,v);
        }
        let body: string;
        try {
            body = JSON.stringify(data)
        } catch(reason){
            console.error('failed to stringify: %o',data);
            return createIError({
                message: 'JSON.stringify failed'
            });
        }
        const headers: HeadersInit = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        try{
            const res = await fetch(url,{
                method,
                headers,
                body
            });
            return await res.json();
        } catch(reason){
            console.error('failed to fetch: %o',reason);
            return createIError({
                message: 'internal failure'
            });
        }
    }
}