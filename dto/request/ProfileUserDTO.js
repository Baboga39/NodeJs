class ProfileUserDTO {
    constructor(username, name, phone, second_name, gender, descriptions, address, email) {
        this.name = name;
        this.phone = phone;
        this.second_name = second_name;
        this.gender = gender;
        this.descriptions = descriptions;
        this.address = address;
        this.email = email;
        this.username = username;
    }

    static fromRequest(requestBody) {
        const { username, name, phone, second_name, gender, Descriptions, address, email } = requestBody;
        return new ProfileUserDTO(username, name, phone, second_name, gender, Descriptions, address, email);
    }
}

module.exports = ProfileUserDTO;
