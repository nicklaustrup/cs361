import { Router } from 'express';
import * as users from './login-controller.mjs';

const router = Router();


router.get('', users.users_get_all);
// router.post('', users.users_post_create);
router.post('/', users.users_get_by_email);
router.post('/register', users.users_post_register);

// router.put('/:_id', employees.employees_put_update_by_id);
// router.delete('/:_id', employees.employees_delete_by_id);
// router.post('/filled', employees.employees_post_group_id);


export default router;