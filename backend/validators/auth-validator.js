const { z } = require("zod");

// Making zod object

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(4,{ message: "Username most be atleast 4/four character long." })
    .max(255,{
      message: "Username most not contain more than 255 characters"
    }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email" })
    .min(7, { message: "Email most contain 6 characters" })
    .max(255, { message: "Email most not contain more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone/mobile number is required" })
    .trim()
    .min(4, { message: "Number most contain 4 digits" })
    .max(14, { message: "Number most not conatin more than 14 digits" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password most contain 6 character long" })
    .max(255, {
      message: "password mosst not contain more than 255 characters"
    }),
});

module.exports = signupSchema;
