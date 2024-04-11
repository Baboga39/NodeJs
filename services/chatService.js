const Group = require('../models/Chat/groupModel')
const Message = require('../models/Chat/messageModel')
const User = require('../models/usermodel')


class ChatService {
    static singleChat = async (authenticationUser, userId)=>{
    try {
        const user = await User.findById(userId);
        if(!user) return null;
        const group = await Group.findOne({
            $and: [
                { listUser: { $in: [authenticationUser._id, userId] } }, 
                { listLastUser: { $in: [authenticationUser._id, userId] } }, 
                { isGroup: false },
            ]
        }).exec();

        if(!group){
            const newGroup = new Group({
                createBy: authenticationUser._id,
                listUser: [authenticationUser._id, user.id],
                isGroup: false,
            })
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
    static listChatUsers = async(authenticationUser) => {
        const chat = await Group.find({
        listUser: { $all: [authenticationUser._id] } }).exec();
        if(!chat) return null;
        return chat;
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
                await chat.deleteOne();
                return 2;
            }
            else return 5;
        }
        else{
            const userIndex = chat.listUser.findIndex(userList => userList._id.equals(user._id));
            const userFind = chat.listUser[userIndex];
            chat.listUser.splice(userIndex, 1);
            chat.listLastUser.push(userFind);
            const messageList = await Message.find({chat: chat._id}) ;
            for (const message of messageList) {
                const userReceiveds = message.userReceived;
                for (const userReceived of userReceiveds) {
                    if(userReceived.user.equals(userFind._id))
                    {
                        userReceived.isDelete = true;
                        await message.save();
                    }
                }
            }
            await chat.save();
            return 4;
        }
    }
    static sendMessage = async (authenticationUser, message, chatId) => {
        const chat = await Group.findById(chatId);
        if(!chat) return null;
        const userReceivedArray = chat.listUser.map(userId => ({
            user: userId,
            isDelete: false,
            isSeen: false
        }));
        const newMessage = new Message({
            user: authenticationUser._id,
            message: message,
            chat: chat._id,
            userReceived:userReceivedArray
        })
        await newMessage.save();
        return newMessage;
    }
    static getAllMessageInChat = async (authenticatedUser,chatId) =>{
        const userFind = await User.findById(authenticatedUser._id);
        const chat = await Group.findById(chatId);
        if(!chat) return null;
        const result = [];
        const messageList = await Message.find({chat: chat._id}).sort({ createdDay: 1 });;
        for (const message of messageList) {
            const userReceiveds = message.userReceived;
            for (const userReceived of userReceiveds) {
                if(userReceived.user.equals(userFind._id))
                {
                    if(!userReceived.isDelete)
                    {
                        result.push(message);
                    }
                }
            }
        }
        return result;
    }
    static deleteMessage = async (messageId)=>{
        const message = await Message.findById(messageId);
        if(!message) return null;
        return 1;
    }
}
module.exports = ChatService;