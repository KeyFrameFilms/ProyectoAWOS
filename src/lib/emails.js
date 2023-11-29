import dotenv from "dotenv";
import nodemailer from "nodemailer"

dotenv.config({ path: "src/.env" });

const colors = {
    'black': '#000000',
    'oxford blue': '#14213D',
    'orange': '#FCA311',
    'platinum': '#E5E5E5',
    'white': '#FFFFFF',
    'xanthous': '#EAB01F',
    'ochre': '#CC750D',
    'russet': '#844F29',
    'rsisin-black': '#2D2C36',
    'rich-black': '#12121C'
};

let transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const emailRegister = async (userData) => {

    const { name, email, token } = userData;

    await transport.sendMail({
        from: "keyframe_films_oficial",
        to: email,
        subject: "Welcome to KeyFrame - Confirm your account",
        text: `Thank you for choosing KeyFrame! In our platform, you can sell and buy properties. To continue, please follow the confirmation link below: link`,
        html: `
            <div style="background-color: ${colors.russet}; color: ${colors.white};">
                <p>Hello, ${name}, welcome to KeyFrame Films!</p>
                <p>Your account is almost active. Please follow the activation link below: <a target="_blank" href="http://localhost:3000/auth/login/confirm/${token}" style="color: ${colors.xanthous};">Click Here to Activate Your Account.</a></p>
                <p>If you didn't create this account, just ignore this email.</p>
            </div>
        `
    });

    console.log(`
        ######### MailTrap ############ \n 
            Se está intentando enviar un correo electrónico al usuario: ${userData.email}, con el token de validación: ${userData.token} 
        \n #####################
    `);
}

const emailResetPassword = async (userData) => {

    const { email, tokenPassword } = userData;

    await transport.sendMail({
        from: "220138@utxicotepec.edu.mx",
        to: email,
        subject: "KeyFrame Films --  Reset your Password",
        text: `We have received your password change request, please follow the link below.`,
        html: `
        <section style="width: 100%; display: flex; align-items: center; background-color: ${colors.platinum}; justify-content: space-around;">
            <span style="color: ${colors.oxfordblue};"><strong style="color: ${colors.russet}; font-weight: 800;">KeyFrame</strong>Films</span>
            <div style="width: auto; display: flex; align-items: center; gap: 6px;">
                <a href="#" style="display: flex; align-items: center;">
                    <img src="/src/public/img/brand-facebook" alt="facebook">
                </a>
                <a href="#" style="display: flex; align-items: center;">
                    <img src="/src/public/img/brand-instagram" alt="instagram">
                </a>
                <a href="#" style="display: flex; align-items: center;">
                    <img src="/src/public/img/brand-x" alt="x">
                </a>
            </div>
        </section>
        <section style="width: 100%;">
            <h1 style="color: ${colors.russet};">Reset Password Request</h1>
            <p>Please follow the reset password link below: <a target="_blank" href="http://localhost:3000/ProyectoAWOS/users/login/password-change/${tokenPassword}" style="color: ${colors.xanthous};"> Here to Change your Password.</a></p>
            <p>If you didn't request a password recovery, just ignore this email.</p>
        </section>
        <section style="display: flex; align-items: center; justify-content: center;">
            <hr style="border-color: ${colors.rsisinblack};">
            <p style="color: ${colors.rsisinblack};">ROMERO KEYFRAME FILMS PRODUCTIONS</p>
        </section>
        `
    });

    console.log(`
        ######### MailTrap ############ \n 
            Se está intentando enviar un correo de Cambio de Contraseña al usuario: ${email}, con el token de validación: ${tokenPassword} 
        \n #####################
    `);
}

export {
    emailRegister,
    emailResetPassword
};
