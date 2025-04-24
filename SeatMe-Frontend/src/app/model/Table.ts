export class Table {
  id?: number;
  tableNumber: string;
  capacity: number;
  available: boolean;
  restaurantId: number;

  constructor(id: number, tableNumber: string, capacity: number, available: boolean, restaurantId: number) {
    this.id = id;
    this.tableNumber = tableNumber;
    this.capacity = capacity;
    this.available = available;
    this.restaurantId = restaurantId;
  }
}
