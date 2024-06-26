import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { HomeComponent } from "./home/home.component";
import { PageEditComponent } from "./page-edit/page-edit.component";
import { ReservationsComponent } from "./reservations/reservations.component";
// import { RoomsComponent } from "./rooms/rooms.component";
import { StatusComponent } from "./status/status.component";
import { RoomAvailabilityComponent } from "./room-availability/room-availability.component";
import { AdvertismentManagerComponent } from "./advertisment-manager/advertisment-manager.component";
import { SeasonManagementComponent } from "./season-management/season-management.component";
import { OfferManagementComponent } from "./offer-management/offer-management.component";


export const ADMIN_ROUTES : Routes = [
    {
        path: "",
        component: AdminLayoutComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'page-edit', component: PageEditComponent},
            { path: 'reservations', component: ReservationsComponent},
            // { path: 'rooms', component:RoomsComponent},
            { path: 'status', component: StatusComponent},
            { path: 'availability', component: RoomAvailabilityComponent},
            { path: 'ads', component: AdvertismentManagerComponent},
            { path: 'offers', component: OfferManagementComponent},
            { path: 'seasons', component: SeasonManagementComponent},
        ]
    }
]