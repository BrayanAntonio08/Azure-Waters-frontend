import { Image } from "./Image";

export class RoomType{
    id : number = 0;
    name: string = "";
    price: number = 0;
    description: string = "";
    imagenId: number = 0
    image?: Image;
}