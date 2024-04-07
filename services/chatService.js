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
                { listUser: { $all: [authenticationUser._id, userId] } }, 
                { isGroup: false } 
            ]
        }).exec();

        if(!group){
            const newGroup = new Group({
                createBy: authenticationUser._id,
                listUser: [authenticationUser._id, user.id],
                isGroup: false
            })
            await newGroup.save();
            return newGroup;
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
            listUser: [],
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
            chat.listUser.splice(userIndex, 1);
            await chat.save();
            return 4;
        }
    }
    static sendMessage = async (authenticationUser, message, chatId) => {
        const chat = await Group.findById(chatId);
        if(!chat) return null;
        const newMessage = new Message({
            user: authenticationUser._id,
            message: message,
            chat: chat._id
        })
        await newMessage.save();
        return newMessage;
    }
    static getAllMessageInChat = async (chatId) =>{
        const chat = await Group.findById(chatId);
        if(!chat) return null;
        const messages = await Message.find({chat: chat._id}).sort({ createdDay: 1 });;
        return messages;
    }
    static deleteMessage = async (messageId)=>{
        const message = await Message.findById(messageId);
        if(!message) return null;
        await message.deleteOne();
        return 1;
    }
}
module.exports = ChatService;