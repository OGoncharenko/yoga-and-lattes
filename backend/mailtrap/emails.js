import {mailtrapClient, sender} from "./mailtrap.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{email}];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    })
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
}

export const sendWelcomeEmail = async (email, username) => {
  const recipient = [{email}];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "ab5802c0-0e03-4559-9d7d-3d64c4817ed3",
      template_variables: {
        "company_info_name": "Yoga&Lattes",
        "name": username,
      },
    })
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
}

export const sendResetPasswordEmail = async (email, resetURL) => {
  const recipient = [{email}];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    })
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
}

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{email}];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    })
    console.log("Password reset successful", response);
  } catch (error) {
    console.error("Error in password reset", error);
    throw new Error(`Error in password reset: ${error}`);
  }
}
