//billingMiddleware.ts
import axios from 'axios'
import { Response,Request,NextFunction } from 'express';
import { UserRequest } from '~/types';

const billingMiddleware = async (req:UserRequest, res:Response, next:NextFunction) => {
    try {
        const tenantID = req?.user?.tenantID; // Assuming tenantID is part of the JWT payload
        const appID = req.header('App-ID'); // Assuming appID is passed in the header

        const response = await axios.post('http://your-go-app/billing/check', { appID, tenantID });

        if (response.status === 402) {
            return res.status(402).send('Payment Required. You have unpaid invoices.');
        }

        next();
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = billingMiddleware;
