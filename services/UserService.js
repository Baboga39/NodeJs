// services/userService.js
const UserModel = require('../models/usermodel')
const cloudinary = require('cloudinary').v2;
const Category = require('../models/Blog/categoryModel')
const Blog = require('../models/Blog/blogModel')
const UserRequest = require('../models/Blog/userRequestModel')
const Follow = require('../models/followModel');
const usermodel = require('../models/usermodel');
const Invitation = require('../models/invitationModel')
const Share = require('../models/Blog/shareModel')
const categoryService = require('../services/categoryService')
const blogService= require('../services/blogService')
const notifyService = require('../services/notificationService')
const removeDiacritics = require('diacritics').remove;
const Access = require('../models/accessModel')
class UserService {
static getUserInfo = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    return null;
  }
  return user;
};

static getAllUser = async () => {
  // const roles =  ['Client', 'Admin','Editor'];
  // const statuses =  ['completed', 'locked'];
  // for (let i = 0; i < 30; i++) {
  //   let phoneNumber = '090';
  
  //   for (let j = 0; j < 7; j++) {
  //     phoneNumber += Math.floor(Math.random() * 10); // Tạo số ngẫu nhiên từ 0 đến 9
  //   }
  //   const randomRoleIndex = Math.floor(Math.random() * roles.length);
  //   const randomStatusesIndex = Math.floor(Math.random() * statuses.length);
  //   const user = new UserModel();
  //   const name = this.generateName();
  //   const second_name = this.generateMeaningfulNickname();
  //   const username = this.generateUsername(name,second_name);
  //   const email1 = this.generateEmail(name);
  //   user.name= name;
  //   user.isLogin= true;
  //   user.second_name= second_name;
  //   user.username= username;
  //   user.email= email1;
  //   user.phone= phoneNumber;
  //   user.status = statuses[randomStatusesIndex];
  //   const randomdate = this.randomDate();
  //   user.createdAt = randomdate;
  //   user.updatedAt = randomdate;
  //   user.password="Ngochai0204@";
  //   user.roles= roles[randomRoleIndex];
  //   user.address='Hồ Chí Minh - Thủ Đức';
  //   const gender = this.generateRandomGender();
  //   user.gender= gender;
  //   user.avatar= {
  //     publicId: null,
  //     url: this.generateRandomAvatar(gender)
  //   }
  //   await user.save();
  // }
  const listUsers = await UserModel.find({status: 'completed'}).sort({createdAt: -1});
  
//   for (const user of listUsers) {
//     const numAccesses = Math.floor(Math.random() * 11) + 15;

//     for (let i = 0; i < numAccesses; i++) {
//         const randomDay = Math.floor(Math.random() * 31) + 1;
//         const createdAt = new Date(new Date().getFullYear(), 4, randomDay);
//         await Access.create({ user: user._id, createdAt });
//     }
// }

//Follow:
// const allUsers = await UserModel.find({roles: 'Client', status:'completed'});

// // Lặp qua từng người dùng
// for (const user of allUsers) {
//     // Không tự theo dõi chính mình
//     const usersToFollow = allUsers.filter(u => !u._id.equals(user._id));

//     // Nếu người dùng có ít hơn 40 người dùng
//     if (usersToFollow.length < 40) {
//         // Chỉ lấy số người dùng cần thiết
//         usersToFollow.splice(40);
//     }

//     // Lấy 40 người dùng ngẫu nhiên
//     const randomUsersToFollow = this.getRandomElements(usersToFollow, 40);

//     // Theo dõi mỗi người dùng ngẫu nhiên
//     for (const randomUser of randomUsersToFollow) {
//         await this.followUser(randomUser._id, user);
//     }
//   }
  // const listUserAccess = await UserModel.find({roles: 'Client'})
  // for (const user of listUserAccess) {
  //   // Tạo ngẫu nhiên số lần truy cập, ít nhất là 10
  //   const numAccesses = Math.floor(Math.random() * 4) + 10; // Số ngẫu nhiên từ 10 đến 13

  //   for (let i = 0; i < numAccesses; i++) {
  //       // Tạo ngẫu nhiên ngày từ 01/07 đến 12/07
  //       const randomDay = Math.floor(Math.random() * 12) + 1;
  //       const createdAt = new Date(new Date().getFullYear(), 6, randomDay); // Tháng 6 là tháng 7 do chỉ số bắt đầu từ 0

  //       // Tìm bản ghi truy cập đã tồn tại trong ngày đó của người dùng
  //       const existingAccess = await Access.findOne({
  //           user: user._id,
  //           createdAt: {
  //               $gte: new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate()),
  //               $lt: new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate() + 1)
  //           }
  //       });

  //       // Nếu tồn tại, xóa bản ghi truy cập đó
  //       if (existingAccess) {
  //           await Access.deleteOne({ _id: existingAccess._id });
  //       }

  //       // Tạo bản ghi truy cập mới
  //       await Access.create({ user: user._id, createdAt });
  //   }
//}
  if (!listUsers) {
    return null;
  }
  return listUsers;
}
static getRandomElements = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
static getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
static randomDate() {
  const currentYear = new Date().getFullYear();
  const start = new Date(currentYear, 0, 1); // Ngày 1 tháng 1 của năm hiện tại
  const end = new Date(currentYear, 7, 1); // Ngày 1 tháng 8 của năm hiện tại
  
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
static generateMeaningfulNickname() {
  const meaningfulWords = [
    "Hero", "Champion", "Dragon", "Tiger", "Lion", "Eagle", "Wolf", "Phoenix",
    "Warrior", "Knight", "Wizard", "Ninja", "Samurai", "Master", "King", "Queen",
    "Prince", "Princess", "Star", "Sun", "Moon", "Comet", "Storm", "Shadow",
    "Ghost", "Spirit", "Light", "Dark", "Fire", "Water", "Earth", "Wind", "Metal",
    "Rock", "Stone", "Gem", "Crystal", "Blade", "Arrow", "Bow", "Sword", "Shield",
    "Armor", "Hunter", "Ranger", "Mage", "Healer", "Guardian", "Rider", "Saint",
    "Angel", "Demon", "Dragonborn", "Phoenixborn", "Beast", "Goddess", "God",
    "Lord", "Lady", "Druid", "Summoner", "Warlock", "Bard", "Champ", "Legend"
  ];
  
  // Tạo mảng ký tự đặc biệt
  const specialChars = ['-', '_', '@', '#', '$', '%', '*', '^', '!', '\\', '/'];
  
  const wordCount = Math.floor(Math.random() * 2) + 1;
  let nickname = '';
  for (let i = 0; i < wordCount; i++) {
    nickname += this.getRandomElement(meaningfulWords);
  }

  // Thêm ngẫu nhiên số vào biệt danh
  const numberCount = Math.floor(Math.random() * 3); // Số chữ số từ 0 đến 2
  for (let i = 0; i < numberCount; i++) {
    const pos = Math.floor(Math.random() * (nickname.length + 1));
    nickname = nickname.slice(0, pos) + Math.floor(Math.random() * 10) + nickname.slice(pos);
  }

  // Thêm ngẫu nhiên ký tự đặc biệt vào biệt danh
  const specialCharCount = Math.floor(Math.random() * 3); // Số ký tự đặc biệt từ 0 đến 2
  for (let i = 0; i < specialCharCount; i++) {
    const pos = Math.floor(Math.random() * (nickname.length - 1)) + 1; // Đảm bảo không thêm ở đầu
    nickname = nickname.slice(0, pos) + this.getRandomElement(specialChars) + nickname.slice(pos);
  }

  return nickname;
}

static generateName() {
   //Generate Name: 
const ho = [
  "Nguyễn", "Trần", "Lê", "Phạm", "Huỳnh", "Hoàng", "Phan", "Vũ", 
  "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương"
];

const tenDem = [
  "Văn", "Thị", "Quốc", "Ngọc", "Hữu", "Minh", "Thanh", "Đức", "Công", 
  "Đình", "Trung", "Xuân", "Quang", "Bảo", "Khánh", "Phương", "Gia", 
  "Hải", "Chí", "Thành", "Nhật", "Đăng", "Tuấn", "Ngọc", "Thiên", "Kiều", 
  "Thu", "Đông", "Nam", "Bắc", "Thảo", "Hương", "Hồng", "Hoàng", "Mai", 
  "Lan", "Linh", "Yến", "Nga", "Phượng", "Hạnh", "My", "Uyên", "Trâm", 
  "Vi", "Vy", "Thùy", "An", "Nhi", "Diễm"
];

const ten = [
  "Anh", "Bình", "Châu", "Dũng", "Em", "Giang", "Hòa", "Khang", 
  "Lam", "Lộc", "Minh", "Nam", "Oanh", "Phát", "Quân", "Sơn", 
  "Thành", "Uy", "Vân", "Xuân", "Yên", "Đan", "Đạt", "Hùng", "Quyên"
];
  const hoRandom = ho[Math.floor(Math.random() * ho.length)];
  
  const demCount = Math.floor(Math.random() * 3); 
  let tenDemRandom = '';
  for (let i = 0; i < demCount; i++) {
    tenDemRandom += tenDem[Math.floor(Math.random() * tenDem.length)] + ' ';
  }
  
  const tenRandom = ten[Math.floor(Math.random() * ten.length)];
  
  const fullName = hoRandom + ' ' + tenDemRandom + tenRandom;
  
  return fullName.trim();
}
static generateEmail(nickname) {
  // Bỏ dấu tiếng Việt
  let email = removeDiacritics(nickname);
  
  // Loại bỏ khoảng cách và ký tự đặc biệt
  email = email.replace(/[\s\W]+/g, '').toLowerCase();
  
  // Nối với "@gmail.com"
  email += "@gmail.com";
  
  return email;
}
static generateUsername(str1, str2) {
  // Bỏ dấu tiếng Việt
  let username1 = removeDiacritics(str1);
  let username2 = removeDiacritics(str2);
  
  // Loại bỏ khoảng cách và ký tự đặc biệt
  username1 = username1.replace(/[\s\W]+/g, '').toLowerCase();
  username2 = username2.replace(/[\s\W]+/g, '').toLowerCase();
  
  // Nối hai chuỗi lại
  return username1 + username2;
}
static generateRandomGender() {
  // Mảng chứa hai giá trị giới tính
  const genders = ["male", "female"];
  // Chọn ngẫu nhiên một trong hai giá trị
  return genders[Math.floor(Math.random() * genders.length)];
}
static generateRandomAvatar(gender) {
  // Mảng chứa hình ảnh cho giới tính nam
const maleAvatars = [
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/90764/man-studio-portrait-light-90764.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/848117/pexels-photo-848117.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/868113/pexels-photo-868113.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/761115/pexels-photo-761115.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1073097/pexels-photo-1073097.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1182825/pexels-photo-1182825.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/832998/pexels-photo-832998.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Thêm các hình ảnh khác nếu cần
];

// Mảng chứa hình ảnh cho giới tính nữ
const femaleAvatars = [
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1090387/pexels-photo-1090387.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/413959/pexels-photo-413959.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/235462/pexels-photo-235462.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4380970/pexels-photo-4380970.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Thêm các hình ảnh khác nếu cần
];
  // Nếu giới tính là male, chọn ngẫu nhiên một hình ảnh từ mảng maleAvatars
  if (gender === "male") {
    return maleAvatars[Math.floor(Math.random() * maleAvatars.length)];
  } 
  // Nếu giới tính là female, chọn ngẫu nhiên một hình ảnh từ mảng femaleAvatars
  else if (gender === "female") {
    return femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];
  } 
  // Mặc định, trả về null
  else {
    return null;
  }
}

static updateUserInfo = async (authenticatedUser, profileDTO,res ) =>{

    const user_id = authenticatedUser.user._id
    const user = await UserModel.findById(user_id);
    const existingUser = await UserModel.findOne({ email: profileDTO.email });
    const existingUsername = await UserModel.findOne({ username : profileDTO.username});
    if (existingUser && existingUser._id.toString() !== user_id.toString()) {
      console.log('Email already exists')
      console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Email already exists',
          result: null,
        });
    }
    if (existingUsername && existingUsername._id.toString() !== user_id.toString()) {
    console.log('Username already exists')
    console.log('--------------------------------------------------------------------------------------------------------------------')
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Username already exists',
        result: null,
      });
  }
    // Update user information with data from the profileDTO
    user.name = profileDTO.name || user.name;
    user.phone = profileDTO.phone || user.phone;
    user.second_name = profileDTO.secondName || user.second_name;
    user.gender = profileDTO.gender || user.gender;
    user.descriptions = profileDTO.descriptions || user.descriptions;
    user.address = profileDTO.address || user.address;
    user.username = profileDTO.username || user.username;
    
    // Save the updated user to the database
    await user.save();
    const userUpdate = await UserModel.findById(user_id);
    console.log('Updated user info successfully')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User information updated successfully',
      result: userUpdate,
    });
}
static uploadAvatar = async(authenticatedUser, fileData) =>{
  try {
    const user = await UserModel.findById(authenticatedUser.user._id);
    if (user.avatar!=null)
    {
      cloudinary.uploader.destroy(user.avatar.publicId);
    }
    user.avatar.url = fileData.path; 
    user.avatar.publicId = fileData.filename;
    await user.save();
    return user.avatar;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
}
static removeAvatar = async(authenticatedUser) =>{
  const user = await UserModel.findById(authenticatedUser.user._id);
  if (user.avatar!=null)
  {
    cloudinary.uploader.destroy(user.avatar.publicId);
  }
  user.avatar.publicId = null;
  user.avatar.url = null;
  user.save();
}
static newPassword = async(req, res) =>{

  const { password, confirmPassword, email } = req.body;

  if (!password || !confirmPassword || !email) {
    console.log('Not found information')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Please enter full information',
      result: null,
    });
  }
  if (password!== confirmPassword) {
    console.log('Password do not match')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Passwords do not match. Try again',
      result: null,
    });
  }
  const user = await User.findOne({email});
  if (!user) {
    console.log('Not found user in database')
    console.log('--------------------------------------------------------------------------------------------------------------------')
    return res.status(401).json({
      success: false,
      statusCode: 400,
      message: 'Not found. Please try again',
      result: null,
    });
  }
  await AuthService.resetPassword(user, password)
  console.log('Reset password successfully')
  console.log('--------------------------------------------------------------------------------------------------------------------')
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Reset password successfully',
    result: null,
  });
} 


//////////////////////////////// Interaction with Categories //////////////////////////////////////////////////////////////////
static leaveCategory = async (authenticatedUser, categoryId) => { 
  const category = await Category.findById(categoryId);
  if(!category)
  {
    return null;
  }
  await category.removeUsers(authenticatedUser._id);
  const userCount = await UserModel.countDocuments({ _id: { $in: category.users } });
  category.sumUser = userCount;
  return await category.save();
}
static requestJoin = async (userId, categoryId) =>{

  const user = await UserModel.findById(userId);
  const category = await Category.findById(categoryId);

  const userRequestFind = await UserRequest.findOne({Category: category})
  if (!user) {
    console.log('-------------------------------------------------------------------------------------------------');
    console.log('Not found user');
    return 1;
  }
  if (!category) {
    console.log('-------------------------------------------------------------------------------------------------');
    console.log('Not found category');
    return 2;
  }
  if(userRequestFind){
    if (!userRequestFind.Users.some(userId => userId.equals(user._id))) {
      userRequestFind.Users.push(user._id);
      await userRequestFind.save();
  } else {
      const userIndex = userRequestFind.Users.findIndex(userId => userId.equals(user._id));
      if (userIndex !== -1) {
          userRequestFind.Users.splice(userIndex, 1);
          await userRequestFind.save();
          return 5;
      }
  }
    return userRequestFind;
  }
  const userRequest = new UserRequest({
      Users: [user._id],
      Category: category._id
  });
  await userRequest.save();
  return userRequest;
}
static listUserRequest = async(categoryId) =>{
  console.log(categoryId);
  const category = await Category.findById(categoryId);
  if (!category) {
    console.log('Not found category');
    return 1;
  }
  const userRequest = await UserRequest.findOne({Category: category});
  if(userRequest==null) {
    return 2;
  }
  if(userRequest.Users==null){
    console.log('This category do not have any users request');
    return 2;
  }
  return userRequest;
}
// static invitationRequest = async(userId, categoryId, authenticatedUser) =>{
//   const authenticatedUserFind = await UserModel.findById(authenticatedUser._id);
//   const category = await Category.findById(categoryId);
//   if (category.isAdmin._id.equals(authenticatedUserFind._id)  || authenticatedUserFind.roles === 'Admin' ) {
//     if(Array.isArray(userId)) {
//       if(userId.length===0)
//       {
//         return 1;
//       }
//       for(let i = 0; i < userId.length; i++) {
//         const user = await UserModel.findById(userId[i]);
//         if (!user) {
//           console.log('-------------------------------------------------------------------------------------------------');
//           console.log('Not found user');
//           return 1;
//         }
//         const userInvitationFind = await Invitation.findOne({Category: category, userIsInvited: user._id});
//         if (!category) {
//           console.log('-------------------------------------------------------------------------------------------------');
//           console.log('Not found category');
//           return 2;
//         }
//         const request = await UserRequest.findOne({ Category: category._id });
//         if (request) {
          
//             if (!request.Users || !request.Users.some(userFind =>  userFind.equals(user._id))) {
//             } else {
//                 await categoryService.addUsersToCategory(category._id,user._id);
//                 return 7;
//             }
//           }
//         if(!userInvitationFind) {
//           const newInvitation = new Invitation({
//             Category: category,
//             userInvite:authenticatedUserFind._id,
//             userIsInvited: user._id,
//           });
//           await newInvitation.save();
//         return newInvitation;
//         }
//         return 6
//       }
//     } else {
//       const user = await UserModel.findById(userId);
//       if (!user) {
//         console.log('-------------------------------------------------------------------------------------------------');
//         console.log('Not found user');
//         return 1;
//       }
//       const userInvitationFind = await Invitation.findOne({Category: category, userIsInvited: user._id});
//       if (!category) {
//         console.log('-------------------------------------------------------------------------------------------------');
//         console.log('Not found category');
//         return 2;
//       }
//       if(userInvitationFind) {
//         return 3;
//       }
//       const request = await UserRequest.findOne({ Category: category._id });
//       if (request) {
//         if (!request.Users || !request.Users.some(userFind =>  userFind.equals(user._id))) {
          
//         } else {
//             await categoryService.addUsersToCategory(category._id,user._id);
//             return 7;
//         }
//       }
//       const newInvitation = new Invitation({
//         Category: category,
//         userInvite: authenticatedUserFind._id,
//         userIsInvited: user._id,
//       });
//       await newInvitation.save();
//       return newInvitation;
//     }
//   }
//   return 5;
// }
static invitationRequest = async(userId, categoryId, authenticatedUser) =>{
  const authenticatedUserFind = await UserModel.findById(authenticatedUser._id);
  const category = await Category.findById(categoryId);
  if (category.isAdmin._id.equals(authenticatedUserFind._id)  || authenticatedUserFind.roles === 'Admin' ) {
        const user = await usermodel.findById(userId);
        if(!user)
        {
          return 1;
        }
        const userInvitationFind = await Invitation.findOne({Category: category, userIsInvited: user._id});
        if (!category) {
          console.log('-------------------------------------------------------------------------------------------------');
          console.log('Not found category');
          return 2;
        }
        const request = await UserRequest.findOne({ Category: category._id });
        if (request) {
            if (!request.Users || !request.Users.some(userFind =>  userFind.equals(user._id))) {
            } else {
                await categoryService.addUsersToCategory(category._id,user._id);
                return 7;
            }
          }
        if(!userInvitationFind) {
          const newInvitation = new Invitation({
            Category: category,
            userInvite:authenticatedUserFind._id,
            userIsInvited: user._id,
          });
          await newInvitation.save();
        return newInvitation;
        }
        return 6
  }
  return 5;
}
static acceptInvitation= async (categoryId, authenticatedUser,status) =>{
  const invitation =await  Invitation.findOne({Category: categoryId, userIsInvited: authenticatedUser._id});
  if(!invitation)
  {
    return null;
  }
  if(status ===1)
  {
    await categoryService.addUsersToCategory(invitation.Category._id,authenticatedUser._id);
    await invitation.deleteOne();
    return 1;
  }
  await invitation.deleteOne();
  return 2; 
}
static listInvitations = async (authenticatedUser) =>{
  const authenticatedUserFind = await UserModel.findById(authenticatedUser._id);
  const invitations = await Invitation.find({userIsInvited:authenticatedUserFind._id});
  if(invitations==null) {
    return 2;
  }
  if(invitations.length===0) {
    return 3;
  }
  return invitations;
}

static getWallUsers = async (userId, authenticatedUser) =>{
  let user = await usermodel.findById(userId);
  const authenticatedUserFind = await usermodel.findById(authenticatedUser._id);
  const isfollow = await this.isUserFollowedByAuthenticatedUser(user._id, authenticatedUserFind._id)
  user.isfollow = isfollow;
  return user;
}



//////////////////////////////// Interaction with blog //////////////////////////////////////////////////////////////////
static likeBlog = async (authenticatedUser, blogId) => {
  const blog = await Blog.findById(blogId);
  const user = await UserModel.findById(authenticatedUser._id);

  if (!blog || !user) {
    return null;
  }
  const isLikedBefore = blog.listUserLikes.some(likedUser => likedUser.equals(user._id));
  if (!isLikedBefore) {
    blog.listUserLikes.push(user);
    blog.likes += 1;
    blog.isLiked = true;
  } else {
    blog.listUserLikes = blog.listUserLikes.filter(likedUser => !likedUser.equals(user._id));
    blog.isLiked = false;
    blog.likes -= 1;
  }
  await blog.save();

  return blog;
}
static saveBlog = async (authenticatedUser, blogId) => {
  const blog = await Blog.findById(blogId);
  const user = await UserModel.findById(authenticatedUser._id);
  
  if (!blog || !user) {
    return null;
  }

  const isSavedBefore = blog.savedBy.some(savedUser => savedUser.equals(user._id));
  if (!isSavedBefore) {
    blog.savedBy.push(user);
    blog.isSave = true;
  } else {
    blog.savedBy = blog.savedBy.filter(savedUser => !savedUser.equals(user._id));
    blog.isSave = false;
  }
  await blog.save();

  return blog;
}
static listBlogSaveByUser(authenticatedUser) {
  return Blog.find({savedBy: authenticatedUser._id}).select('savedBy')
  .populate('savedBy');;
}
static shareBlog = async (authenticatedUser, blogId) =>{
  const blog = await Blog.findById(blogId);
  const user = await UserModel.findById(authenticatedUser._id);
  
  if (!blog || !user) {
    return null;
  }
  const isSharecheck = await Share.findOne({ user: user._id, listBlog: blog._id });
  if(isSharecheck) {
    return 2;
  }
  const isShare = await Share.findOne({user: user._id})
  if(!isShare){
    const newShare = new Share({user: user._id,
      listBlog: blog._id});
      return await newShare.save();
  }
  isShare.listBlog.push(blog._id)
  await isShare.save();
  return isShare;
}


//////////////////////////////// Interaction with User //////////////////////////////////////////////////////////////////
static followUser = async (user_id, authenticatedUser) => {
  try {
    console.log(authenticatedUser)
    const userToFollow = await usermodel.findById(user_id);
    const user = await UserModel.findById(user_id);
    const userAuthentication = await UserModel.findById(authenticatedUser._id)
    if (!userToFollow) {
        return 1;
    }
      let follow = await Follow.findOne({ user: authenticatedUser._id });
      let following = await Follow.findOne({ user: user_id});
      if(!following)
      {
        following = new Follow({ 
          user: user_id, 
          follower: [],
          following: [] 
      });
      }
      if (!follow) {          
        follow = new Follow({ 
              user: authenticatedUser._id, 
              follower: [],
              following: [] 
          });
      }
      const alreadyFollowing = follow.following.some(userId => userId.equals(userToFollow._id));
      if (alreadyFollowing) {
          follow.following.pull(user_id);
          following.follower.pull(authenticatedUser._id)
          user.totalFollower -= 1;
          userAuthentication.totalFollowing-=1;
          await user.save();
          await userAuthentication.save();
          await following.save();
          await follow.save();
          return 2;
      } else {
          follow.following.push(user_id);
          following.follower.push(authenticatedUser._id)
          user.totalFollower += 1;
          userAuthentication.totalFollowing +=1;
          await user.save();
          await userAuthentication.save();
          await follow.save();
          await following.save();
          return follow;
      }
  } catch (error) {
      throw new Error(error.message);
  }
}
static isUserFollowedByAuthenticatedUser = async (user_id, authenticatedUser_id) => {
  try {
      const follow = await Follow.findOne({ user: authenticatedUser_id }); 
      if (!follow) {
          return false;
      }
      const isFollowed = follow.following.some(userId => userId.equals(user_id));
      return isFollowed;
  } catch (error) {
      throw new Error(error.message);
  }
}
static listUserFollower = async (user_id, authenticatedUser) => {
  try {
      const follow = await Follow.findOne({ user: user_id });
      if (!follow) {
          return 1;
      }
      const userFollowerResult = [];
      let followers = follow.follower;
      for (let i = 0; i < followers.length; i++) {
          const followerId = followers[i];
          const user = await usermodel.findById(followerId);
          if (!user) {
              throw new Error(`User with id ${followerId} not found`);
          }
          const isFollowed = await this.isUserFollowedByAuthenticatedUser(user._id, authenticatedUser._id);
          user.isfollow = isFollowed;
          userFollowerResult.push(user)
      }
      return userFollowerResult;
  } catch (error) {
      throw new Error(error.message);
  }
}
static listUserFollowing = async (user_id, authenticatedUser) => {
  try {
      const follow = await Follow.findOne({ user: user_id });
      if (!follow) {
          return 1;
      }
      let followers = follow.following;
      const result = []
      for (let i = 0; i < followers.length; i++) {
          const followerId = followers[i];
          const user = await usermodel.findById(followerId);
          if (!user) {
              throw new Error(`User with id ${followerId} not found`);
          }
          const isFollowed = await this.isUserFollowedByAuthenticatedUser(user._id, authenticatedUser._id);
          user.isfollow = isFollowed;
          result.push(user);
      }
      return result;
  } catch (error) {
      throw new Error(error.message);
  }
}
static listFriend = async (userId)=>{
  const user = await UserModel.findById(userId);  
  if(!user) {
    return null;
  }
  const followUser = await Follow.findOne({user: user._id});
  if (!followUser) {
    return null;
  }
  if(followUser.follower===null ||!followUser.follower )
  {
    return null;
  }
  if(followUser.following===null ||!followUser.following )
  {
    return null;
  }
  const listFriend = [];
    for(const userFollowing of followUser.following) {
      for(const userFollower of followUser.follower){
      if(userFollower._id.equals(userFollowing._id)) 
      {
        const isFollowed = await this.isUserFollowedByAuthenticatedUser(user._id, user._id);
        user.isfollow = isFollowed;
        listFriend.push(userFollowing);
      }
    }
}
if (listFriend.length===0){
  return null;
}
  return listFriend;
}

static search =async(keyword, type, authenticatedUser) =>
{
  try {
  const regex = new RegExp(keyword, 'i');
  const user = await usermodel.findById(authenticatedUser._id);
  if(type==='Blog')
  {
    const blogs = await blogService.listBlogSearch(user, keyword)
    return blogs;
  }
  if(type==='Category'){
    const categories = await categoryService.listCategorySearch(user, keyword) 
    return categories;
  }
  if(type==='User'){
    const users = await UserModel.find({
      $text: { $search: regex },
      status: 'completed',
      _id: { $ne: user._id } // Loại bỏ user hiện tại
    }, {
      score: { $meta: 'textScore' } // Lấy điểm số của kết quả tìm kiếm
    }).sort({
      score: { $meta: 'textScore' } // Sắp xếp theo điểm số giảm dần
    });

    const filteredUsers = [];

    for (const userF of users) {
        const isFollowed = await this.isUserFollowedByAuthenticatedUser(userF._id, authenticatedUser._id);
        userF.isfollow = isFollowed;
        if (!userF._id.equals(user._id)) {
          filteredUsers.push(userF);
        }
    }
    return filteredUsers;
  }
}
  catch (error) {
      throw new Error(error.message);
  }
}
static removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
static listFiveUser= async()=>{
  const users = await usermodel.find();
  const mostFollowedClientUser = await UserModel.find({ roles: 'Client', status:'completed' })
      .sort({ totalFollower: -1 })
      .limit(5)
      .exec();
  return mostFollowedClientUser;
}
static updateStatusUser= async(userId)=> {
  const user = await usermodel.findById(userId);
  user.isLogin = true;
  await user.save();
  return 0;
}
}
module.exports = UserService