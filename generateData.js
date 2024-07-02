// Access:  Từ 15 - 25 
function generateName() {
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
function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
}
function generateMeaningfulNickname() {
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
function generateEmail(nickname) {
    // Bỏ dấu tiếng Việt
    let email = removeDiacritics(nickname);
    
    // Loại bỏ khoảng cách và ký tự đặc biệt
    email = email.replace(/[\s\W]+/g, '').toLowerCase();
    
    // Nối với "@gmail.com"
    email += "@gmail.com";
    
    return email;
}
function generateUsername(str1, str2) {
    // Bỏ dấu tiếng Việt
    let username1 = removeDiacritics(str1);
    let username2 = removeDiacritics(str2);
    
    // Loại bỏ khoảng cách và ký tự đặc biệt
    username1 = username1.replace(/[\s\W]+/g, '').toLowerCase();
    username2 = username2.replace(/[\s\W]+/g, '').toLowerCase();
    
    // Nối hai chuỗi lại
    return username1 + username2;
  }
function generateRandomGender() {
    // Mảng chứa hai giá trị giới tính
    const genders = ["male", "female"];
    
    // Chọn ngẫu nhiên một trong hai giá trị
    return genders[Math.floor(Math.random() * genders.length)];
  }
function generateRandomAvatar(gender) {
    // Mảng chứa hình ảnh cho giới tính nam
const maleAvatars = [
    "male_avatar1.jpg",
    "male_avatar2.jpg",
    "male_avatar3.jpg",
    // Thêm các hình ảnh khác nếu cần
  ];
  
  // Mảng chứa hình ảnh cho giới tính nữ
  const femaleAvatars = [
    "female_avatar1.jpg",
    "female_avatar2.jpg",
    "female_avatar3.jpg",
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
  