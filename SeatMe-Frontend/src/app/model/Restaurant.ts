export class Restaurant {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  managerEmail: string;
  managerPassword: string;

  constructor(
    id: number,
    name: string,
    address: string,
    contactNumber: string,
    managerEmail: string,
    managerPassword: string
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.contactNumber = contactNumber;
    this.managerEmail = managerEmail;
    this.managerPassword = managerPassword;
  }
}
