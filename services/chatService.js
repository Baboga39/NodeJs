const Group = require('../models/Chat/groupModel')
const Message = require('../models/Chat/messageModel') 
const User = require('../models/usermodel')
const Follow = require('../models/followModel')
const notification = require('../models/notificationModel')
const groupModel = require('../models/Chat/groupModel')
const notificationModel = require('../models/notificationModel')

class ChatService {
    static isUserFollowedByAuthenticatedUser   = async (user_id, authenticatedUser_id) => {
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
    static singleChat = async (authenticationUser, userId)=>{
    try {
        const user = await User.findById(userId);
        if(!user) return null;
        const group = await Group.findOne({
            $and: [
                { listUser: { $in: [authenticationUser._id, userId] } }, 
                { isGroup: false },
            ]
        }).exec();
        if(!group){
            const newGroup = new Group({
                createBy: authenticationUser._id,
                listUser: [authenticationUser._id, user.id],
                isGroup: false,
                userReceived: user._id,
                isWait: false,
            })
            const isFollower = await this.isUserFollowedByAuthenticatedUser(authenticationUser._id,userId);
            const isFollowing = await this.isUserFollowedByAuthenticatedUser(userId,authenticationUser);
            if(!isFollower || !isFollowing)
            {
                newGroup.isWait = true;
            }
            await newGroup.save();
            return newGroup;
        } else {
            const userInListUser = group.listUser.some(id => id.equals(userId));
            const authenticatedUserInListUser = group.listUser.some(id => id.equals(authenticationUser._id));
            if (!authenticatedUserInListUser) {
                group.listUser.push(authenticationUser);
                group.listLastUser.pull(authenticationUser);
                await group.save();
            }
            if (!userInListUser) {
                group.listUser.push(user);
                group.listLastUser.pull(user);
                await group.save();
            }
        }
        return group;
        }
        catch (error) {
            console.log("Error Single Chat: " + error)
        }
    }
    static findById = async(chatId) => {
        const chat = await Group.findById(chatId);
        if(!chat) return null;
        return chat;
    }
    static groupChat = async (authenticationUser, chatName,userIds) =>{
        const users = [];
        for(const userId of userIds)
        {
            const user = await User.findById(userId);
            if(!user) return null;
            users.push(user);
        }
        const newGroup = new Group({
            createBy: authenticationUser._id,
            admins: authenticationUser._id,
            chatName: chatName,
            isGroup: true
        })
        for(const userId of userIds)
        {
            const user = await User.findById(userId);
            if(!user) return null;
            newGroup.listUser.push(user);
        }
        newGroup.listUser.push(authenticationUser._id);
        await newGroup.save();
        return newGroup;
    }
    static addUserToGroup = async (authenticationUser, userIds, chatId)=>{
    const chat = await Group.findById(chatId);
    const users = [];
    for(const userId of userIds){
        const user = await User.findById(userId);
        if(!user) return null;
        users.push(user);
    }
    if(!chat) return 1;
    if(chat.admins.some(admin => admin._id.equals(authenticationUser._id)))
        {
            for(const user of users)
            {   if(!chat.listUser.some(userList => userList._id.equals(user._id))){
                chat.listUser.push(user)}
            continue;
            }
            await chat.save();
            return chat;
        }
    return 3;
    }
    static removeUserFromGroup = async (authenticationUser, userIds, chatId)=>{
        const chat = await Group.findById(chatId);
        const users = [];
        for(const userId of userIds){
            const user = await User.findById(userId);
            if(!user) return null;
            users.push(user);
        }
        if(!chat) return 1;
        if(chat.admins.some(admin => admin._id.equals(authenticationUser._id)))
            {
                for(const user of users)
                {   
                    if(chat.listUser.some(userList => userList._id.equals(user._id))){
                    const userIndex = chat.listUser.findIndex(userList => userList._id.equals(user._id));
                    chat.listUser.splice(userIndex, 1);
                }
                continue;
                }
                await chat.save();
                return chat;
            }
        return 3;
    }
    static leaveGroup = async (authenticationUser, chatId)=>{
        const user = await User.findById(authenticationUser._id)
        const chat = await Group.findById(chatId);
        if(!chat) return 1;
        const userIndex = chat.listUser.findIndex(userList => userList._id.equals(user._id));
        chat.listUser.splice(userIndex, 1);
        await chat.save();
        return chat;
    }
    static updateIsRead = async (userId, chatId)=>{
        const chat = await Group.findById(chatId);
        let result = false;
        const listNotify =  await notification.find({
            chat: chatId,
            recipient: userId,
            type: 'Chat',
        })
        for(const notify of listNotify){
            if(notify.recipient._id.equals(userId)&& notify.chat._id.equals(chat._id)){
                result = notify.isRead;
            }
        }
        return result;
    }
    // static listChatUsers = async (authenticationUser) => {
    //     const user = await User.findById(authenticationUser._id);
    //     const chats = await Group.find({
    //         $and: [
    //             { listUser: { $all: [authenticationUser._id] } },
    //             {
    //                 $or: [
    //                     { isWait: false },
    //                     {
    //                         isWait: true,
    //                         userReceived: { $ne: authenticationUser._id }
    //                     }
    //                 ]
    //             }
    //         ]
    //     }).exec();
    //     if (!chats) return null;
    
    //     const result = [];
    
    //     const removeDuplicates = (arr) => {
    //         const uniqueArray = [];
    //         arr.forEach(item => {
    //             if (!uniqueArray.some(uniqueItem => uniqueItem._id.equals(item._id))) {
    //                 uniqueArray.push(item);
    //             }
    //         });
    //         return uniqueArray;
    //     };
    
    //     chats.forEach(chat => {
    //         result.push(chat);
    //     });
    
    //     chats.forEach(chat => {
    //         if (!chat.isGroup) {
    //             const listUser = chat.listUser;
    //             let userReceived;
    //             for (let userCheck of listUser) {
    //                 if (!userCheck._id.equals(user._id)) {
    //                     userReceived = userCheck;
    //                 }
    //             }
    //             chat.userReceived = userReceived;
    //             chat.isWait = false;
    //             result.push(chat);
    //         }
    //     });
    
    //     const uniqueResult = removeDuplicates(result);
    //     const chatWithStatus = uniqueResult.map(async chat => {
    //         const isRead = await this.updateIsRead(authenticationUser._id, chat._id);  
    //         return { ...chat.toObject(), isRead };
    //     });
    //     const resultRes = await Promise.all(chatWithStatus);
    //     resultRes.sort((a, b) => {
    //         return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    //     });
    
    //     return resultRes;
    // }
    static listChatUsers = async (authenticationUser) => {
    const userId = authenticationUser._id;

    // Tìm kiếm các chat mà người dùng đang tham gia và có điều kiện phù hợp
    const chats = await Group.find({
        $and: [
            { listUser: { $all: [userId] } },
            {
                $or: [
                    { isWait: false },
                    {
                        isWait: true,
                        userReceived: { $ne: userId }
                    }
                ]
            }
        ]
    }).exec();

    if (!chats) return null;

    // Sử dụng Map để lưu trữ các mục duy nhất
    const chatMap = new Map();

    // Xử lý các chat tìm được
    for (let chat of chats) {
        if (!chat.isGroup) {
            const userReceived = chat.listUser.find(u => !u.equals(userId));
            chat.userReceived = userReceived;
            chat.isWait = false;
        }
        chatMap.set(chat._id.toString(), chat);
    }

    // Tạo một mảng các promise để theo dõi trạng thái đã đọc
    const chatWithStatusPromises = Array.from(chatMap.values()).map(async chat => {
        const isRead = await this.updateIsRead(userId, chat._id);
        return { ...chat.toObject(), isRead };
    });

    // Chờ tất cả các promise hoàn thành
    const resultRes = await Promise.all(chatWithStatusPromises);

    // Sắp xếp kết quả theo updatedAt
    resultRes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return resultRes;
}

// Hàm updateIsRead giữ nguyên như bạn đã cung cấp
static updateIsRead = async (userId, chatId) => {
    const chat = await Group.findById(chatId);
    let result = false;
    const listNotify = await notification.find({
        chat: chatId,
        recipient: userId,
        type: 'Chat',
    });
    for (const notify of listNotify) {
        if (notify.recipient._id.equals(userId) && notify.chat._id.equals(chat._id)) {
            result = notify.isRead;
        }
    }
    return result;
}
static listChatUsers = async (authenticationUser) => {
    const userId = authenticationUser._id;

    // Tìm kiếm các chat mà người dùng đang tham gia và có điều kiện phù hợp
    const chats = await Group.find({
        $and: [
            { listUser: { $all: [userId] } },
            {
                $or: [
                    { isWait: false },
                    {
                        isWait: true,
                        userReceived: { $ne: userId }
                    }
                ]
            }
        ]
    }).exec();

    if (!chats) return null;

    // Sử dụng Map để lưu trữ các mục duy nhất
    const chatMap = new Map();

    // Xử lý các chat tìm được
    for (let chat of chats) {
        if (!chat.isGroup) {
            const userReceived = chat.listUser.find(u => !u.equals(userId));
            chat.userReceived = userReceived;
            chat.isWait = false;
        }
        chatMap.set(chat._id.toString(), chat);
    }

    // Tạo một mảng các promise để theo dõi trạng thái đã đọc
    const chatWithStatusPromises = Array.from(chatMap.values()).map(async chat => {
        const isRead = await this.updateIsRead(userId, chat._id);
        return { ...chat.toObject(), isRead };
    });

    // Chờ tất cả các promise hoàn thành
    const resultRes = await Promise.all(chatWithStatusPromises);

    // Sắp xếp kết quả theo updatedAt
    resultRes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return resultRes;
}

    static checkIsReadChat = async (authenticationUser,chatId)=> {
        const chat = await Group.findById(chatId);
        if(!chat) return null;
        let isRead = true;
        const listNotify =  await notification.find({
            chat: chatId,
            recipient: authenticationUser._id,
            type: 'Chat',
        })
        for(const notify of listNotify){
            if(notify.recipient._id.equals(authenticationUser._id)&& notify.chat._id.equals(chat._id)){
                notify.isRead = true;
                await notify.save();
            }
        }
        return { ...chat.toObject(), isRead };
    }
    static findChatById= async (chatId) => {
        const chat = await Group.findById(chatId);
        if(!chat) return null;
        return chat;
    }
    static findChatByIsAdmin= async (userId) => {
        const chat = await Group.findOne({admins: userId});
        return chat;
    }
    // static listChatUsersIsWait = async(authenticationUser) => {
    //     const user = await User.findById(authenticationUser._id);
    //     const chats = await Group.find({
    //     listUser: { $all: [authenticationUser._id] },
    //     isWait: true,
    //     userReceived: authenticationUser._id}).exec();
    //     if(!chats) return null;
    //     const result = [];
    //     chats.forEach(chat => {
    //         if (!chat.isGroup) {
    //             const listUser= chat.listUser;
    //             var userReceived;
    //             for(let userCheck of listUser)
    //             {
    //                 if(!userCheck._id.equals(user._id)){
    //                     userReceived = userCheck;
    //                 }
    //             }
    //             chat.userReceived = userReceived;
    //             result.push(chat);
    //         }
    //     });
    //     result.sort((a, b) => {
    //         return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    //     });      
    //     return result;
    // }
    static listChatUsersIsWait = async(authenticationUser) => {
        const userId = authenticationUser._id;
    
        // Tìm kiếm các chat mà người dùng đang chờ
        const chats = await Group.find({
            listUser: { $all: [userId] },
            isWait: true,
            userReceived: userId
        }).exec();
    
        if (!chats) return null;
    
        const result = [];
    
        // Xử lý các chat tìm được
        for (let chat of chats) {
            if (!chat.isGroup) {
                const userReceived = chat.listUser.find(u => !u.equals(userId));
                chat.userReceived = userReceived;
                result.push(chat);
            }
        }
    
        // Sắp xếp kết quả theo updatedAt
        result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
        return result;
    }
    
    static deleteChatByUser = async(authenticationUser,chatId) => {
        const chat = await Group.findById(chatId);
        const user = await User.findById(authenticationUser._id);
        if(!user) return 3;
        if(!chat) return null;
        if(chat.isGroup)
        {
            if(chat.admins.some(userList => userList._id.equals(user._id)))
            {
                await notification.deleteMany({chat: chat});
                await chat.deleteOne();
                return 2;
            }
            else return 5;

        }
        else{
            // const userIndex = chat.listUser.findIndex(userList => userList._id.equals(user._id));
            // const userFind = chat.listUser[userIndex];
            // chat.listUser.splice(userIndex, 1);
            // chat.listLastUser.push(userFind);
            // const messageList = await Message.find({chat: chat._id}) ;
            // for (const message of messageList) {
            //     const userReceiveds = message.userReceived;
            //     for (const userReceived of userReceiveds) {
            //         if(userReceived.user.equals(userFind._id))
            //         {
            //             userReceived.isDelete = true;
            //             await message.save();
            //         }
            //     }
            // }
            // await chat.save();
            await notification.deleteMany({chat: chat});
            await chat.deleteOne();
            return 4;
        }
    }
    static sendMessage = async (authenticationUser, message, chatId,type) => {
        const chat = await Group.findById(chatId);
        if(!chat) return null;
        const userReceivedArray = chat.listUser.map(userId => ({
            user: userId,
            isDelete: false,
            isSeen: false,
        }));
        const newMessage = new Message({
            user: authenticationUser._id,
            message: {
                content: message,
                type: type
            },
            chat: chat._id,
            userReceived:userReceivedArray,
        })
        chat.chatName = chat.chatName;
        chat.markModified('chatName'); 
        await chat.save();
        await newMessage.save();
        return newMessage;
    }
    static getAllMessageInChat = async (authenticatedUser,chatId) =>{
        //const userFind = await User.findById(authenticatedUser._id);
        const chat = await Group.findById(chatId);
        if(!chat) return null;
        // const result = [];
        const messageList = await Message.find({chat: chat._id}).sort({ createdDay: 1 });
        // for (const message of messageList) {
        //     const userReceiveds = message.userReceived;
        //     for (const userReceived of userReceiveds) {
        //         if(userReceived.user.equals(userFind._id))
        //         {
        //             if(!userReceived.isDelete)
        //             {
        //                 result.push(message);
        //             }
        //         }
        //     }
        // }
        return messageList;
    }
    static deleteMessage = async (messageId,authenticatedUser)=>{
        const message = await Message.findById(messageId);
        if(!message) return null;
        if(!message.user.equals(authenticatedUser._id))
        return 1;
        const chat = await groupModel.findById(message.chat._id);
        await notificationModel.deleteMany({chat: chat});
        await message.deleteOne();
    }
    static editChatName = async(chatId,authenticatedUser,name)=>{
        const chat = await Group.findById(chatId);
        if(!chat) return null;
        chat.chatName = name;
        await chat.save();
        return chat;
    }
    static evaluteChat = async(chatId,authenticatedUser,status)=>{
        const chat = await Group.findById(chatId);
        if(!chat) return null;
        if(status===true)
        {
            await Group.updateOne(
                { _id: chatId },
                { $set: { isWait: false }, $currentDate: { createdAt: true } }
            );
            return await Group.findById(chatId);
        }
        await chat.deleteOne();
        return 1;
    }
}
module.exports = ChatService;