import { DBconnection } from "@/lib/db";
import ContactMessage from "@/model/Inquiry";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await DBconnection();

    try {
        const body = await request.json();

        const { email, phone, message, source, status } = body;

        if (!email || !message) {
            return NextResponse.json(
                { message: "Email and message are required", success: false },
                { status: 400 }
            );
        }

        const safeStatus =
            status && ["new", "read", "replied"].includes(status) ? status : undefined;

        const contact = await ContactMessage.create({
            email,
            phone: phone ?? "",
            message,
            source: source ?? "contact-page", // default if not provided
            status: safeStatus, // if undefined, schema default ("new") will apply
        });

        return NextResponse.json(
            { message: "Message submitted successfully", success: true, contact },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Create contact message error:", error);

        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        return NextResponse.json(
            {
                message: "Something went wrong while submitting message",
                success: false,
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}


export async function GET() {
    await DBconnection();

    try {
        const inquiries = await ContactMessage.find({})
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(
            { success: true, inquiries },
            { status: 200 }
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch inquiries",
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}