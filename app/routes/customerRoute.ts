import {Router} from 'express';
import {addNewCustomer, getAllCustomers, getCustomerById} from '../controllers/customersController';

const router = Router();

router.post('/', addNewCustomer);
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.delete('/:id', (req, res) => {
  res.status(501).send('Delete customer functionality is not implemented yet.');
}
);

export default router;
// 