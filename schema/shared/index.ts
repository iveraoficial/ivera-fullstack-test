import {
    ICharacter,
    IGetCharactersOffsetAndLimitQueryParameters,
    IRequestLog,
    IGetCharacterDetails,
    ICharacters,
    IFrontendUser,
    IUser,
    IRequest,
    IPagination,
    IGetRequestLogsQuery,
    ILogsResult,
    IListCharacters,
    IRegisterUser,
    IAuthorization,
    ISignInUser,
    IVoid,
    IError,
} from '../../shared/index';
function isUnknownObject(value: unknown): value is Record<string,unknown> {
    return typeof value === 'object' && value !== null;
}
function validateVector<T>(value: unknown, validate: (val: unknown) => boolean): value is T[] {
    if(!Array.isArray(value)) return false;
    for(const i of value) if(!validate(i)) return false;
    return true;
}
export function createICharacter(params: Partial<ICharacter> = {}): ICharacter {
    return Object.freeze(Object.seal({
        "id": 0,
        "name": '',
        "description": '',
        "thumbnail": {
            "path": '',
            "extension": ''
        },
        "resourceURI": '',
        "events": {
            "available": 0,
            "returned": 0,
            "items": []
        },
        "comics": {
            "available": 0,
            "collectionURI": '',
            "items": []
        },
        ...params
    } as ICharacter));
}
export function isICharacter(value: unknown): value is ICharacter {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['id'] === 'number')) return false;
    if(!(typeof value['name'] === 'string')) return false;
    if(!(typeof value['description'] === 'string')) return false;
    if(!isUnknownObject(value['thumbnail'])) return false;
    if(!(typeof value['thumbnail']['path'] === 'string')) return false;
    if(!(typeof value['thumbnail']['extension'] === 'string')) return false;
    if(!(typeof value['resourceURI'] === 'string')) return false;
    if(!isUnknownObject(value['events'])) return false;
    if(!(typeof value['events']['available'] === 'number')) return false;
    if(!(typeof value['events']['returned'] === 'number')) return false;
    if(!validateVector(value['events']['items'], value => {
        if(!isUnknownObject(value)) return false;
        if(!(typeof value['name'] === 'string')) return false;
        if(!(typeof value['resourceURI'] === 'string')) return false;
        return true;
    })) return false;
    if(!isUnknownObject(value['comics'])) return false;
    if(!(typeof value['comics']['available'] === 'number')) return false;
    if(!(typeof value['comics']['collectionURI'] === 'string')) return false;
    if(!validateVector(value['comics']['items'], value => {
        if(!isUnknownObject(value)) return false;
        if(!(typeof value['resourceURI'] === 'string')) return false;
        if(!(typeof value['name'] === 'string')) return false;
        return true;
    })) return false;
    return true;
}
export function createIGetCharactersOffsetAndLimitQueryParameters(params: Partial<IGetCharactersOffsetAndLimitQueryParameters> = {}): IGetCharactersOffsetAndLimitQueryParameters {
    return Object.freeze(Object.seal({
        "nameStartsWith": '',
        "offset": '',
        "limit": '',
        ...params
    } as IGetCharactersOffsetAndLimitQueryParameters));
}
export function isIGetCharactersOffsetAndLimitQueryParameters(value: unknown): value is IGetCharactersOffsetAndLimitQueryParameters {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['nameStartsWith'] === 'string')) return false;
    if(!(typeof value['offset'] === 'string')) return false;
    if(!(typeof value['limit'] === 'string')) return false;
    return true;
}
export function createIRequestLog(params: Partial<IRequestLog> = {}): IRequestLog {
    return Object.freeze(Object.seal({
        "method": '',
        "pathname": '',
        "createdAt": '',
        ...params
    } as IRequestLog));
}
export function isIRequestLog(value: unknown): value is IRequestLog {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['method'] === 'string')) return false;
    if(!(typeof value['pathname'] === 'string')) return false;
    if(!(typeof value['createdAt'] === 'string')) return false;
    return true;
}
export function createIGetCharacterDetails(params: Partial<IGetCharacterDetails> = {}): IGetCharacterDetails {
    return Object.freeze(Object.seal({
        "id": '',
        ...params
    } as IGetCharacterDetails));
}
export function isIGetCharacterDetails(value: unknown): value is IGetCharacterDetails {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['id'] === 'string')) return false;
    return true;
}
export function createICharacters(params: Partial<ICharacters> = {}): ICharacters {
    return Object.freeze(Object.seal({
        "code": 0,
        "status": '',
        "attributionText": '',
        "attributionHTML": '',
        "etag": '',
        "data": {
            "offset": 0,
            "limit": 0,
            "total": 0,
            "count": 0,
            "results": []
        },
        ...params
    } as ICharacters));
}
export function isICharacters(value: unknown): value is ICharacters {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['code'] === 'number')) return false;
    if(!(typeof value['status'] === 'string')) return false;
    if(!(typeof value['attributionText'] === 'string')) return false;
    if(!(typeof value['attributionHTML'] === 'string')) return false;
    if(!(typeof value['etag'] === 'string')) return false;
    if(!isUnknownObject(value['data'])) return false;
    if(!(typeof value['data']['offset'] === 'number')) return false;
    if(!(typeof value['data']['limit'] === 'number')) return false;
    if(!(typeof value['data']['total'] === 'number')) return false;
    if(!(typeof value['data']['count'] === 'number')) return false;
    if(!validateVector(value['data']['results'], value => {
        if(!isUnknownObject(value)) return false;
        if(!(typeof value['id'] === 'number')) return false;
        if(!(typeof value['name'] === 'string')) return false;
        if(!(typeof value['description'] === 'string')) return false;
        if(!isUnknownObject(value['thumbnail'])) return false;
        if(!(typeof value['thumbnail']['path'] === 'string')) return false;
        if(!(typeof value['thumbnail']['extension'] === 'string')) return false;
        if(!(typeof value['resourceURI'] === 'string')) return false;
        if(!isUnknownObject(value['events'])) return false;
        if(!(typeof value['events']['available'] === 'number')) return false;
        if(!(typeof value['events']['returned'] === 'number')) return false;
        if(!validateVector(value['events']['items'], value => {
            if(!isUnknownObject(value)) return false;
            if(!(typeof value['name'] === 'string')) return false;
            if(!(typeof value['resourceURI'] === 'string')) return false;
            return true;
        })) return false;
        if(!isUnknownObject(value['comics'])) return false;
        if(!(typeof value['comics']['available'] === 'number')) return false;
        if(!(typeof value['comics']['collectionURI'] === 'string')) return false;
        if(!validateVector(value['comics']['items'], value => {
            if(!isUnknownObject(value)) return false;
            if(!(typeof value['resourceURI'] === 'string')) return false;
            if(!(typeof value['name'] === 'string')) return false;
            return true;
        })) return false;
        return true;
    })) return false;
    return true;
}
export function createIFrontendUser(params: Partial<IFrontendUser> = {}): IFrontendUser {
    return Object.freeze(Object.seal({
        "authId": '',
        "username": '',
        ...params
    } as IFrontendUser));
}
export function isIFrontendUser(value: unknown): value is IFrontendUser {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['authId'] === 'string')) return false;
    if(!(typeof value['username'] === 'string')) return false;
    return true;
}
export function createIUser(params: Partial<IUser> = {}): IUser {
    return Object.freeze(Object.seal({
        "username": '',
        ...params
    } as IUser));
}
export function isIUser(value: unknown): value is IUser {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['username'] === 'string')) return false;
    return true;
}
export function createIRequest(params: Partial<IRequest> = {}): IRequest {
    return Object.freeze(Object.seal({
        "___returnType": undefined,
        ...params
    } as IRequest));
}
export function isIRequest(value: unknown): value is IRequest {
    if(!isUnknownObject(value)) return false;
    if(!(true)) return false;
    return true;
}
export function createIPagination(params: Partial<IPagination> = {}): IPagination {
    return Object.freeze(Object.seal({
        "offset": 0,
        "limit": 0,
        ...params
    } as IPagination));
}
export function isIPagination(value: unknown): value is IPagination {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['offset'] === 'number')) return false;
    if(!(typeof value['limit'] === 'number')) return false;
    return true;
}
export function createIGetRequestLogsQuery(params: Partial<IGetRequestLogsQuery> = {}): IGetRequestLogsQuery {
    return Object.freeze(Object.seal({
        "offset": '',
        "limit": '',
        ...params
    } as IGetRequestLogsQuery));
}
export function isIGetRequestLogsQuery(value: unknown): value is IGetRequestLogsQuery {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['offset'] === 'string')) return false;
    if(!(typeof value['limit'] === 'string')) return false;
    return true;
}
export function createILogsResult(params: Partial<ILogsResult> = {}): ILogsResult {
    return Object.freeze(Object.seal({
        "logs": [],
        ...params
    } as ILogsResult));
}
export function isILogsResult(value: unknown): value is ILogsResult {
    if(!isUnknownObject(value)) return false;
    if(!validateVector(value['logs'], value => {
        if(!isUnknownObject(value)) return false;
        if(!(typeof value['method'] === 'string')) return false;
        if(!(typeof value['pathname'] === 'string')) return false;
        if(!(typeof value['createdAt'] === 'string')) return false;
        return true;
    })) return false;
    return true;
}
export function createIListCharacters(params: Partial<IListCharacters> = {}): IListCharacters {
    return Object.freeze(Object.seal({
        "name": '',
        "nameStartsWith": '',
        "modifiedSince": '',
        "comics": 0,
        "series": 0,
        "events": 0,
        "stories": 0,
        "orderBy": "name",
        "limit": 0,
        "offset": 0,
        ...params
    } as IListCharacters));
}
export function isIListCharacters(value: unknown): value is IListCharacters {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['name'] === 'string')) return false;
    if(!(typeof value['nameStartsWith'] === 'string')) return false;
    if(!(typeof value['modifiedSince'] === 'string')) return false;
    if(!(typeof value['comics'] === 'number')) return false;
    if(!(typeof value['series'] === 'number')) return false;
    if(!(typeof value['events'] === 'number')) return false;
    if(!(typeof value['stories'] === 'number')) return false;
    if(
        !(() => {
            if(!(value['orderBy'] === "name")) return false;
            return true;
        })() &&
        !(() => {
            if(!(value['orderBy'] === "-name")) return false;
            return true;
        })() &&
        !(() => {
            if(!(value['orderBy'] === "modified")) return false;
            return true;
        })() &&
        !(() => {
            if(!(value['orderBy'] === "-modified")) return false;
            return true;
        })()
    ) return false;
    if(!(typeof value['limit'] === 'number')) return false;
    if(!(typeof value['offset'] === 'number')) return false;
    return true;
}
export function createIRegisterUser(params: Partial<IRegisterUser> = {}): IRegisterUser {
    return Object.freeze(Object.seal({
        "username": '',
        "password": '',
        ...params
    } as IRegisterUser));
}
export function isIRegisterUser(value: unknown): value is IRegisterUser {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['username'] === 'string')) return false;
    if(!(typeof value['password'] === 'string')) return false;
    return true;
}
export function createIAuthorization(params: Partial<IAuthorization> = {}): IAuthorization {
    return Object.freeze(Object.seal({
        "authId": '',
        "value": '',
        ...params
    } as IAuthorization));
}
export function isIAuthorization(value: unknown): value is IAuthorization {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['authId'] === 'string')) return false;
    if(!(typeof value['value'] === 'string')) return false;
    return true;
}
export function createISignInUser(params: Partial<ISignInUser> = {}): ISignInUser {
    return Object.freeze(Object.seal({
        "username": '',
        "password": '',
        ...params
    } as ISignInUser));
}
export function isISignInUser(value: unknown): value is ISignInUser {
    if(!isUnknownObject(value)) return false;
    if(!(typeof value['username'] === 'string')) return false;
    if(!(typeof value['password'] === 'string')) return false;
    return true;
}
export function createIVoid(params: Partial<IVoid> = {}): IVoid {
    return Object.freeze(Object.seal({
        "status": "ok",
        ...params
    } as IVoid));
}
export function isIVoid(value: unknown): value is IVoid {
    if(!isUnknownObject(value)) return false;
    if(!(value['status'] === "ok")) return false;
    return true;
}
export function createIError(params: Partial<IError> = {}): IError {
    return Object.freeze(Object.seal({
        "status": "failure",
        "message": '',
        ...params
    } as IError));
}
export function isIError(value: unknown): value is IError {
    if(!isUnknownObject(value)) return false;
    if(!(value['status'] === "failure")) return false;
    if(!(typeof value['message'] === 'string')) return false;
    return true;
}
