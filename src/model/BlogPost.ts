import mongoose, { Document, Schema } from "mongoose";

export type BlogStatus = "draft" | "published";

export interface IBlogPost extends Document {
    title: string;
    slug: string;          // used for /blog/[slug]
    category: string;
    excerpt?: string;
    heroImage?: string;

    readTime?: string;     // e.g. "2m"
    content: string;       // markdown/html/json string

    status: BlogStatus;
    publishedAt?: Date | null;

    createdAt: Date;
    updatedAt: Date;
}

const BlogPostSchema: Schema<IBlogPost> = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            trim: true,
            lowercase: true,
            unique: true,
            index: true,
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },
        excerpt: {
            type: String,
            default: "",
            trim: true,
        },
        heroImage: {
            type: String,
            default: "",
            trim: true,
        },
        readTime: {
            type: String,
            default: "",
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
            index: true,
        },
        publishedAt: {
            type: Date,
            default: null,
            index: true,
        },
    },
    { timestamps: true }
);

// ✅ Optional: auto-set publishedAt when status becomes published
BlogPostSchema.pre("save", async function () {
    if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
        this.publishedAt = new Date();
    }
});

const BlogPost =
    mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
