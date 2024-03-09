const Tag = require('../models/Blog/tagModel');

class TagService {

    static async addTag(name,categoryId){
        const exitsTag = await Tag.findOne({name});
        if(exitsTag){
            return null;
        }
        const tag = new Tag({
            name: name,
            category: categoryId,
        })
        return tag.save()
    }
    static async getAllTags() {
        const tags = await Tag.find();
        return tags
    }
    static async getTagById(tagId) {
        const tag = await Tag.findById(tagId);
        if (!tag) {
            return null;
        }
        return tag;
    }
    static async deleteTag(tagId) {
     await Tag.findByIdAndDelete(tagId);
    }

}
module.exports = TagService