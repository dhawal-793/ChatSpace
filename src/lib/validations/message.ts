import { z } from 'zod';


export const mesageValidator = z.object({
    id: z.string(),
    senderId: z.string(),
    text: z.string(),
    timestamp: z.number(),
})

export const messageArrayValidator = z.array(mesageValidator);

export type Message = z.infer<typeof mesageValidator>;