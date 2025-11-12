
import { EntryCreate, EntryUpdate } from "./dto/entries.dto";
import { EntryRepository } from "./enttries.repository";

export const EntryService = {
    
createEntry: async (data: any) => {

    const existing= await EntryRepository.findById(data.title!);
   if (existing) {
      
      throw {
        statusCode: 400,
        message: 'Entry with this ID already exists',
      };
    }

const newEntry = await EntryRepository.create(data);
    return newEntry; 
},


listEntries: async (options: { page?: number; limit?: number; search?: string }) => {
 
const page = Math.max(options.page || 1, 1);
const limit = Math.max(options.limit || 10, 1);
const skip = (page - 1) * limit;


const where = options.search
? { title: { contains: options.search, mode: 'insensitive' } }
: undefined;


const [total, data] = await Promise.all([
EntryRepository.count(where),
EntryRepository.findMany({ skip, take: limit, where, orderBy: { createdAt: 'desc' } })
]);


return { page, limit, total, data };
},


updateEntry: async (id: string, payload: EntryUpdate) => {
return EntryRepository.update(id, payload as any);
},


deleteEntry: async (id: string) => {
return EntryRepository.delete(id);
}
};