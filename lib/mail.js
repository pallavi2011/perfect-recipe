import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendPasswordResetEmail = async (email, token) =>{
    const resetLink = `${domain}/new-password?token=${token}`;

    await resend.emails.send({
        from:"mail@perfectrecipe.co",
        to: email,
        subject: "Reset your password",
        html:`<p>Click <a href="${resetLink}">here</a> to reset your password.</p>
        <p>If you did not request this email, please ignore it.</p>
        <p>Thank you!</p>`
    })
}


export const sendVerificationEmail = async (
    email,
    token,

) => {
    const confirmLink = `${domain}/new-verification?token=${token}`;

    await resend.emails.send({
        from:"mail@perfectrecipe.co",
        to: email,
        subject: "Verify your email",
        html:`<p>Click <a href="${confirmLink}">here</a> to verify your email address.</p>
        <p>If you did not request this email, please ignore it.</p>
        <p>Thank you!</p>`
    })
}