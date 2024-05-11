// Access:  Từ 15 - 25 
const users = await User.find();

for (const user of users) {
    const numAccesses = Math.floor(Math.random() * 11) + 15;

    for (let i = 0; i < numAccesses; i++) {
        const randomDay = Math.floor(Math.random() * 31) + 1;
        const createdAt = new Date(new Date().getFullYear(), 3, randomDay);
        await Access.create({ user: user._id, createdAt });
    }
}
