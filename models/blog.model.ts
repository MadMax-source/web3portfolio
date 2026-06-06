import mongoose, { Schema, model, models } from 'mongoose';

export type BlogCategory = 'AI' | 'Ethical Hacking' | 'Web3 Development' | 'Web3 Marketing';

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    excerpt: { type: String, required: true },
    content: { type: String, required: true },

    category: {
      type: String,
      enum: ['AI', 'Ethical Hacking', 'Web3 Development', 'Web3 Marketing'],
      required: true,
    },

    tags: [{ type: String }],

    readTime: { type: String, default: '5 min read' },

    featured: { type: Boolean, default: false },

    author: {
      name: { type: String, default: 'Alex Morgan' },
      role: { type: String, default: 'Developer' },
      initials: { type: String, default: 'AM' },
    },

    coverImage: { type: String }, // optional (Cloudinary later)

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Blog = models.Blog || model('Blog', BlogSchema);
