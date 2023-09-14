import { IVehicle } from "src/vehicle/interfaces/ivehicle";

export interface IOwner {
    owner_id?: number,
    first_name: string,
    last_name: string,
    email?: string,
    date_of_birth?: Date,
    vehicles?: IVehicle[]
}
