
import prisma from '../../config/prisma';


export const EntryRepository = {
    
create: async (data: Partial<any>) => {
    console.log("Dgdfhfghfghfh");
    
return prisma.entry.create({ data: data as any });
},
createMany: async (data: Partial<any>) => {
return prisma.entry.createMany({ data: data as any ,skipDuplicates:true});
},


findMany: async (options: { skip?: number; take?: number; where?: any; orderBy?: any }) => {
return prisma.entry.findMany(options as any);
},


count: async (where?: any) => {
return prisma.entry.count({ where });
},


findById: async (id: string) => {
return prisma.entry.findUnique({ where: { id } });
},

findByName: async (title: string) => {
return prisma.entry.findUnique({ where: { title } });
},


update: async (id: string, data: Partial<any>) => {
return prisma.entry.update({ where: { id }, data: data as any });
},


delete: async (id: string) => {
return prisma.entry.delete({ where: { id } });
}
};