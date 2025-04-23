export class Reservation {
    id: number;
    customerId: number;
    tableId: number;
    reservationTime: string;
    numberOfGuests: number;
  
    constructor(
      id: number,
      customerId: number,
      tableId: number,
      reservationTime: string,
      numberOfGuests: number
    ) {
      this.id = id;
      this.customerId = customerId;
      this.tableId = tableId;
      this.reservationTime = reservationTime;
      this.numberOfGuests = numberOfGuests;
    }
  }
  