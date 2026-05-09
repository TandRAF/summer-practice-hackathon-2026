import { z } from 'zod';
export const RegisterSchema = z.object({
    email: z
        .string()
        .email('Adresa de email invalidă'),
    password: z
        .string()
        .min(8, 'Parola trebuie să aibă cel puțin 8 caractere'),
    username: z
        .string()
        .min(3, 'Username-ul este prea scurt')
        .max(20, 'Username-ul este prea lung'),
});
//# sourceMappingURL=register.schema.js.map