export class Restaurant {
  
    name: string;
    address: string;
    contactNumber: string;
    managerEmail: string;
    managerPassword: string;
  
    constructor(
    
      name: string,
      address: string,
      contactNumber: string,
      managerEmail: string,
      managerPassword: string
    ) {
    
      this.name = name;
      this.address = address;
      this.contactNumber = contactNumber;
      this.managerEmail = managerEmail;
      this.managerPassword = managerPassword;
    }
  }
  