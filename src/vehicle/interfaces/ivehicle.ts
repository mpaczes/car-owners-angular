export interface IVehicle {
    vehicle_id?: number,
    vin_number: string,
    brand: string,
    model: string,
    color?: string,
    date_of_build?: Date,
    owner_id: number
}
