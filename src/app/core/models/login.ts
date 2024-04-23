export interface Login {
    usuario: string;
    contrasenna: string;
}

export class Login implements Login {
    constructor(public usuario: string, public contrasenna: string, public ID: number) { };
}