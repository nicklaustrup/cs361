import { Router } from 'express';
import * as employees from './employee-controller.mjs';

const router = Router();


router.get('', employees.employees_get_all);
router.post('', employees.employees_post_create);
router.get(':_id', employees.employees_get_by_id);
router.put(':_id', employees.employees_put_update_by_id);
router.delete(':_id', employees.employees_delete_by_id);


export default router;