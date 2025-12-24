import { DBconnection } from "@/lib/db";
import ContactMessage from "@/model/Inquiry";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    await DBconnection();

    try {
        const { id } = await context.params;
        const body = await request.json().catch(() => ({}));

        const nextStatus =
            body?.status && ["new", "read", "replied"].includes(body.status)
                ? body.status
                : "read";

        const update: any = { status: nextStatus };
        if (nextStatus === "read") update.readAt = new Date();

        const updated = await ContactMessage.findByIdAndUpdate(id, update, { new: true });

        if (!updated) {
            return NextResponse.json(
                { success: false, message: "Inquiry not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Inquiry updated", inquiry: updated },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update inquiry",
                error: error?.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    await DBconnection();

    try {
        const { id } = await context.params;

        const deleted = await ContactMessage.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Inquiry not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Inquiry deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete inquiry",
                error: error?.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}
