import { z } from "zod";

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 14;

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(14).refine((data) => {
        return data.length >= PASSWORD_MIN_LENGTH && data.length <= PASSWORD_MAX_LENGTH;
    }, {
        message: "must be between " + PASSWORD_MIN_LENGTH + " and " + PASSWORD_MAX_LENGTH + " characters.",
    }),
    username: z.string().refine((data) => !/\s/.test(data), {
        message: "must not contain spaces",
    })
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})