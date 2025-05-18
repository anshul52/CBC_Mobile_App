import { executeQuery2 } from '../config/db.js';
import { LOG_MESSAGES, RESPONSE_MESSAGES } from '../constants/constants.js';
import logger from '../utils/logger.js';
import { SQL_QUERIES } from '../queries/queries.js';
import stripe from '../config/stripe.js';

export const createPaymentIntent = async (req, res) => {
    const { _id } = req.user;
    const { amount, currency = 'inr' } = req.body;

    try {
        // Get user details from database
        const [user] = await executeQuery2(SQL_QUERIES.SELECT_USER_DETAILS, [_id]);
        
        if (!user) {
            logger.error(LOG_MESSAGES.USER_NOT_FOUND);
            return res.status(404).json({
                success: false,
                message: RESPONSE_MESSAGES.USER_NOT_FOUND
            });
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to smallest currency unit (paise for INR)
            currency: currency,
            metadata: {
                user_id: _id,
                email: user.email
            }
        });

        res.status(200).json({
            success: true,
            message: RESPONSE_MESSAGES.PAYMENT_INTENT_CREATED,
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        logger.error(LOG_MESSAGES.ERROR_IN_PAYMENT_INTENT(error));
        console.log(error);
        res.status(500).json({
            success: false,
            message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
        });
    }
};

export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                // Update payment status in database
                await executeQuery2(SQL_QUERIES.UPDATE_PAYMENT_STATUS, [
                    paymentIntent.metadata.user_id,
                    'completed',
                    paymentIntent.amount / 100,
                    new Date(),
                    paymentIntent.id
                ]);
                break;

            case 'payment_intent.payment_failed':
                const failedPayment = event.data.object;
                logger.error(LOG_MESSAGES.PAYMENT_FAILED(failedPayment.id));
                // Handle failed payment
                await executeQuery2(SQL_QUERIES.UPDATE_PAYMENT_STATUS, [
                    failedPayment.metadata.user_id,
                    'failed',
                    failedPayment.amount / 100,
                    new Date(),
                    failedPayment.id
                ]);
                break;
        }

        res.json({ received: true });
    } catch (error) {
        logger.error(LOG_MESSAGES.ERROR_IN_WEBHOOK(error));
        res.status(400).json({
            success: false,
            message: RESPONSE_MESSAGES.WEBHOOK_ERROR
        });
    }
};

export const getPaymentStatus = async (req, res) => {
    const { _id } = req.user;
    
    try {
        const [payment] = await executeQuery2(SQL_QUERIES.GET_PAYMENT_STATUS, [_id]);
        
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: RESPONSE_MESSAGES.PAYMENT_NOT_FOUND
            });
        }

        res.status(200).json({
            success: true,
            message: RESPONSE_MESSAGES.PAYMENT_STATUS_RETRIEVED,
            payment: {
                status: payment.status,
                amount: payment.amount,
                date: payment.payment_date,
                transactionId: payment.transaction_id
            }
        });

    } catch (error) {
        logger.error(LOG_MESSAGES.ERROR_IN_GET_PAYMENT_STATUS(error));
        res.status(500).json({
            success: false,
            message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
        });
    }
};
