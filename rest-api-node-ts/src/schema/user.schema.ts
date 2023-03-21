import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid email'),
        firstname: string({
            required_error: 'Name is required'
        }),
        lastname: string(),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password must be more than 6 characters'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        })
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ['passwordConfirmation']
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>