const Validator = require('validator');

class ProfileUserDTO {
    constructor(name, phone, secondName, gender, descriptions, address, company, country, school,email) {
        this.name = name;
        this.phone = phone;
        this.secondName = secondName;
        this.gender = gender;
        this.descriptions = descriptions;
        this.address = address;
        this.company = company;
        this.country = country;
        this.school = school;
        this.email = email;
    }
}