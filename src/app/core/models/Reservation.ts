
import { ReservationRoom, Room } from "./Room";

export class Reservation {
    id: number = 0;
    guid?: string;
    arriving?: Date;
    departing?: Date;
    room_type_id: number = 0;
    room?: ReservationRoom;
    client_id : string = "";
    client_name: string = "";
    client_lastname: string = "";
    client_email: string = "";
    payment_card: string = "";
}