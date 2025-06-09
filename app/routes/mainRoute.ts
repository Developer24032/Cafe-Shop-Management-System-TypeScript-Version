import {Router} from 'express';
import productRoute from './productRoute';
import userRoute from './userRoute';
import transactionRoute from './transactionRoute';

const mainRoute = Router();
// Mounting sub-routes
mainRoute.use('/products', productRoute);
mainRoute.use('/users', userRoute);
mainRoute.use('/transactions', transactionRoute);

// Exporting the main route
export default mainRoute;
