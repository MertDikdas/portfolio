import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";


export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        console.error("RESEND_API_KEY is missing");

        return res.status(500).json({
            message: "Server configuration error",
        });
    }

    const resend = new Resend(apiKey);
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed",
        });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            message: "All fields are required.",
        });
    }

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string"
    ) {
        return res.status(400).json({
            message: "Invalid input.",
        });
    }

    if (
        name.length > 100 ||
        email.length > 200 ||
        message.length > 5000
    ) {
        return res.status(400).json({
            message: "Input is too long.",
        });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Mert's Portfolio <onboarding@resend.dev>",

            to: ["dikdasmert@gmail.com"],

            replyTo: email,

            subject: `New portfolio message from ${name}`,

            text: `
New message from your portfolio

Name: ${name}
Email: ${email}

Message:
${message}
      `,
        });

        if (error) {
            console.error(error);

            return res.status(500).json({
                message: "Email could not be sent.",
            });
        }

        return res.status(200).json({
            message: "Message sent successfully.",
            id: data?.id,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong.",
        });
    }
}