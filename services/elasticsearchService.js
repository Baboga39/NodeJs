const elasticClient = require('../config/elasticsearch');
const mongoose = require('mongoose');
const Blog = require('../models/Blog/blogModel'); // Đảm bảo đúng đường dẫn đến model Blog

const BLOG_INDEX = 'blogs';

const ElasticsearchService = {
  async createIndex() {
    const exists = await elasticClient.indices.exists({ index: BLOG_INDEX });

    if (!exists) {
      await elasticClient.indices.create({
        index: BLOG_INDEX,
        body: {
          mappings: {
            properties: {
              title: { type: 'text' },
              content: { type: 'text' },
              description: { type: 'text' },
              avatar: { type: 'text' }, // ✅ Thêm avatar
              user: { type: 'keyword' },
              category: { type: 'keyword' },
              createdAt: { type: 'date' }
            }
          }
        }
      });
      console.log(`✅ Created index: ${BLOG_INDEX}`);
    }
  },

  async indexBlog(blog) {
    if (!blog || !blog._id) {
      console.error("🚨 Lỗi: Blog không có _id, bỏ qua đồng bộ.");
      return;
    }

    await elasticClient.index({
      index: BLOG_INDEX,
      id: blog._id.toString(),
      body: {
        title: blog.title || "",
        content: blog.content || "",
        description: blog.description || "",
        avatar: blog.avatar || "", // ✅ Thêm avatar
        user: blog.user ? blog.user.toString() : null,
        category: blog.category instanceof mongoose.Types.ObjectId ? blog.category.toString() : null,
        createdAt: blog.createdAt || new Date()
      }
    });
  },

  async searchBlogs(keyword) {
    const result = await elasticClient.search({
      index: BLOG_INDEX,
      body: {
        query: {
          multi_match: {
            query: keyword,
            fields: ['title', 'content', 'description']
          }
        }
      }
    });

    return result.hits.hits.map(hit => ({
      id: hit._id,
      ...hit._source
    }));
  },

  async syncBlogsToElasticsearch() {
    try {
      console.log("🔄 Đang đồng bộ dữ liệu Blogs lên Elasticsearch...");

      const blogs = await Blog.find({ status: "Published" }).lean();

      if (!blogs || blogs.length === 0) {
        console.log("⚠️ Không có blog nào để đồng bộ.");
        return;
      }

      const bulkBody = [];

      blogs.forEach(blog => {
        bulkBody.push({ index: { _index: BLOG_INDEX, _id: blog._id.toString() } });
        bulkBody.push({
          title: blog.title || "",
          content: blog.content || "",
          description: blog.description || "",
          avatar: blog.avatar || "", // ✅ Thêm avatar
          user: blog.user ? blog.user.toString() : null,
          category: blog.category instanceof mongoose.Types.ObjectId ? blog.category.toString() : null,
          createdAt: blog.createdAt || new Date()
        });
      });

      await elasticClient.bulk({ refresh: true, body: bulkBody });

      console.log(`✅ Đồng bộ thành công ${blogs.length} Blogs lên Elasticsearch!`);
    } catch (error) {
      console.error("❌ Lỗi đồng bộ dữ liệu:", error);
    }
  }
};

module.exports = ElasticsearchService;
