import { Router } from 'express';
import * as teams  from './teams-controller.mjs';


const router = Router();


router.get('', teams.teams_get_all);
router.post('', teams.teams_create);
router.get('/:id', teams.teams_get_by_id);
router.delete('/:id', teams.teams_delete_by_id);



export default router;