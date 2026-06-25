import mongoose from "mongoose";

/** Safe DB connect for SSR/sitemap — never calls process.exit. */
export async function connectDBSafe(): Promise<boolean> {
    if (mongoose.connection.readyState === mongoose.ConnectionStates.connected) return true;
    if (!process.env.MONGODB_URI) return false;

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        return true;
    } catch {
        return false;
    }
}
