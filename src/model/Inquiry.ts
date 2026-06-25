import mongoose, { Document, Schema } from "mongoose";

export interface IContactMessage extends Document {
    email: string;
    phone?: string;
    message: string;
    marketingOptIn?: boolean;
    marketingOptInAt?: Date | null;

    source?: string; // e.g. "contact-page"
    status?: "new" | "read" | "replied";

    createdAt: Date;
    updatedAt: Date;
    readAt: Date | null;
}

const ContactMessageSchema: Schema<IContactMessage> = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            default: "",
            trim: true,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
        },
        marketingOptIn: {
            type: Boolean,
            default: false,
        },
        marketingOptInAt: {
            type: Date,
            default: null,
        },

        // optional extras (remove if you don't want them)
        source: {
            type: String,
            default: "contact-page",
            trim: true,
        },
        status: {
            type: String,
            enum: ["new", "read", "replied"],
            default: "new",
        },
        readAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

const ContactMessage =
    mongoose.models.ContactMessage ||
    mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);

export default ContactMessage;
