import { z } from 'zod';

enum entryType{
    MOVIE,
    TV_SHOW
}

export const entryDto = z.object({
title: z.string().min(1),
type: z.string(),
director: z.string().optional(),
budget: z.number().int().nonnegative().optional(),
location: z.string().optional(),
duration: z.number().int().nonnegative().optional(),
year: z.number().int().optional()
});



export const entryUpdateDto = entryDto.partial();


export type EntryCreate = z.infer<typeof entryDto>;
export type EntryUpdate = z.infer<typeof entryUpdateDto>;