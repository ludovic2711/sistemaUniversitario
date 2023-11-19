import {Router} from 'express'
import { getEventos, getEvento, postEvento, putEvento} from '../controllers/eventos';


const router = Router();

router.get('/all', getEventos);
router.get('/:titulo', getEvento);
router.post('/', postEvento);
router.put("/:titulo", putEvento);

export default router;