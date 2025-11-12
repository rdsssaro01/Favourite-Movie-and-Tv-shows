import { NextFunction, Request, Response } from 'express';
import { EntryService } from './entries.servies';
import { en } from 'zod/v4/locales';
import { sendResponse } from '../../middlewars/apiresponse.middleware';

export const EntryController = {

 async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

     const entry = await EntryService.createEntry(req.body);

   return sendResponse(res,"entry create successfully");
  

  },


  async list(req: Request, res: Response, next: NextFunction) : Promise<Response | void> {
      
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const search = req.query.search?.toString();

    const result = await EntryService.listEntries({page, limit, search});
    return sendResponse(res,"list of data",result);
    
  },

  async update(req: Request, res: Response) {
    const entry = await EntryService.updateEntry(req.params.id, req.body);
     return sendResponse(res,"update successfully",entry);
  },

  async remove(req: Request, res: Response) {
    await EntryService.deleteEntry(req.params.id);
    return sendResponse(res,"delete successfully");
  },
};
