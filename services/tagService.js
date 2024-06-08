const Tag = require('../models/Blog/tagModel');
const User = require('../models/usermodel')
class TagService {
    
    static async addTag(name,categoryId, authenticatedUser){
        const user = await User.findById(authenticatedUser.user._id);
        const exitsTag = await Tag.findOne({name});
        if(exitsTag){
            return null;
        }
        const tag = new Tag({
            name: name,
            category: categoryId,
            user: user._id
        })
        return tag.save()
    }
    static async getAllTags() {
        const tags = await Tag.find().sort({createdAt:-1});
        if(!tags) return null;
        return tags
    }
    static async getTagById(tagId) {
        const tag = await Tag.findById(tagId);
        if (!tag) {
            return null;
        }
        return tag;
    }
    static async deleteTag(tagId, authenticatedUser) {
    const tag = await Tag.findById(tagId);
    if (!tag) {
        return null;
    }
    console.log
    if (tag.user._id == authenticatedUser._id  || authenticatedUser.roles == 'Admin' ) {
       await tag.deleteOne();
       return 0;
    }
    else
    return 1;
    }
    static  getAllTags= async() =>{
        const tags = await Tag.find().sort({createdAt: -1});
        return tags
    }

}
module.exports = TagService