import { z } from 'zod';

export const contactSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Correo electrónico inválido'),
    phone: z.string().optional(),
    subject: z.string().min(3, 'El asunto debe tener al menos 3 caracteres'),
    message: z
        .string()
        .min(10, 'El mensaje debe tener al menos 10 caracteres')
        .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
});

export type ContactFormSchema = z.infer<typeof contactSchema>;
