"use server";

import { postContactUs } from "@/app/api/api";

export interface ContactFormState {
    errors?: Record<string, string>;
    message?: string;
    type?: 'success' | 'error';
}

export async function submitContactForm(
    prevState: ContactFormState | null,
    formData: FormData
): Promise<ContactFormState> {
    // Extract form data
    const data = {
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        services: formData.get("services") as string,
        message: formData.get("message") as string,
    };

    // Validate
    const errors: Record<string, string> = {};
    
    if (!data.first_name) errors.first_name = "First name is required";
    if (!data.last_name) errors.last_name = "Last name is required";
    if (!data.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Email is invalid";
    }
    if (!data.phone) errors.phone = "Mobile number is required";
    if (!data.services) errors.services = "Service is required";
    if (!data.message) errors.message = "Message is required";

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    // Submit the form
    try {
        await postContactUs(data);
        return {
            message: "Your message has been sent successfully!",
            type: 'success',
        };
    } catch (error: any) {
        return {
            message: error.message || "Failed to send message. Please try again.",
            type: 'error',
        };
    }
}

