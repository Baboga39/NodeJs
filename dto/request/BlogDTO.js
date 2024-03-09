class BlogDTO {
    constructor(title, content, description,avatar, categoryIds, tagIds,status){
        this.title = title;
        this.content = content;
        this.description = description;
        this.avatar = avatar;
        this.categoryIds = categoryIds;
        this.tagIds = tagIds;
        this.status = status;
    }
    static fromRequest(requestBody) {
        const { title, content, description,avatar, categoryIds, tagIds,status } = requestBody;
        return new BlogDTO(title, content, description,avatar, categoryIds, tagIds,status);
    }
}

module.exports = BlogDTO;