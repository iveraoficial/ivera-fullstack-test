import { IFrontendUser } from "../../shared";

export enum StoreActionType {
    SetCurrentUser = 'SetCurrentUser'
}

export interface ISetCurrentUser {
    type: StoreActionType.SetCurrentUser;
    user: IFrontendUser | null;
}

export function setCurrentUser(user: IFrontendUser | null): ISetCurrentUser {
    return {
        user,
        type: StoreActionType.SetCurrentUser
    };
}

export type AllActions = ISetCurrentUser;

export interface IAppState {
    user: IFrontendUser | null;
}

const initialState: IAppState = {
    user: null
};

export default(state: IAppState = initialState,action: AllActions) =>{
    switch(action.type){
        case StoreActionType.SetCurrentUser:
            state = {
                ...state,
                user: action.user
            };
            break;
    }
    return state;
}
