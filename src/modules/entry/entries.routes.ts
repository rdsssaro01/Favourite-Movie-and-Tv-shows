import { Router } from 'express';
import { EntryController } from './entries.controller';
import { validate } from '../../middlewars/validate.middleware';
import { entryDto, entryUpdateDto } from './dto/entries.dto';


const router = Router();


router.post('/entries', EntryController.create);
router.get('/entries', EntryController.list);
router.put('/entries/:id',validate(entryUpdateDto), EntryController.update);
router.delete('/entries/:id', EntryController.remove);


export default router;