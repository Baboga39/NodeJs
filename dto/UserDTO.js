const ValidatorUtils = require('../config/ValidatorUtlis');

class UserDTO {
  constructor(name, username, email, password, roles, createDate, updateDate, phone, status, second_name, gender, Descriptions) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.phone = phone;
    this.status = status;
    this.second_name = second_name;
    this.gender = gender;
    this.Descriptions = Descriptions;
  }

  static fromRequest(request) {
    return new UserDTO(
      request.name,
      request.username,
      request.email,
      request.password,
      request.roles,
      request.createDate,
      request.updateDate,
      request.phone,
      request.status,
      request.second_name,
      request.gender,
      request.Descriptions
    );
  }


  validate() {

    if (!this.email || !ValidatorUtils.validateEmail(this.email)) {
      throw new Error('Invalid email');
    } 
  }
}

module.exports = UserDTO;