class ProfileUserDTO {
    constructor(username, name, phone, secondName, gender, descriptions, address, email) {
        this.name = name;
        this.phone = phone;
        this.secondName = secondName;
        this.gender = gender;
        this.descriptions = descriptions;
        this.address = address;
        this.email = email;
        this.username = username;
    }

    static fromRequest(requestBody) {
        const { username, name, phone, secondName, gender, Descriptions, address, email } = requestBody;
        return new ProfileUserDTO(username, name, phone, secondName, gender, Descriptions, address, email);
    }
}

module.exports = ProfileUserDTO;
