import { z } from 'zod';
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    username: z.ZodString;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export interface RegisterResponse {
    user: any;
    message: string;
}
//# sourceMappingURL=register.schema.d.ts.map