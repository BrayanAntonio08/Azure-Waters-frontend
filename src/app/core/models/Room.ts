export interface Room{
    id: number ;
    number: number ;
    type_id: number ;
    active: boolean ;
    reserved: boolean ;
    checking: boolean ;
}

export class ReservationRoom{
    id: number = 0;
    number: number = 0;
    type_id?: number ;
    image_url?: string;
    description: string = "";
    price: number = 0;
}
