

export interface IUser {
    email: string,
    name: string,
    id: string,
    status: boolean,
}

export interface IData {
    text: string,
    email: string,
}


export interface ITodo {
    text: string;
    email: string;
    $id: string;   
}

export interface IProfile {
    avatar_url: string;
    email: string,
    $id: string
}

export interface IModal {
    id: string
}
