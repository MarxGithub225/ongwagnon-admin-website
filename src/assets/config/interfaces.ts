export interface User {
    id : number;
    email : string;
    level : string;
    state : string;
    date : number;
}

export interface State {
    user: User,
    loading: Boolean,
}

export interface navbarState {
    userSideActive : Boolean
}


export interface bannerState {
    banners : any[] | [],
}

export interface categoryState {
    categories : any[] | [],
    subacetgories : any[] | [],
}

export interface headquaterState {
    headerquaters : any[] | [],
}

export interface colorState {
    colors : any[] | [],
}


export interface administratorState {
    admins : any[] | []
}

export interface productState {
    products : any[] | [],
}

export interface eventState {
    events : any[] | [],
}


export interface orderState {
    orders : any[] | [],
}

export interface shopState {
    shops : any[] | [],
}
export interface userState {
    users : any[] | [],
}