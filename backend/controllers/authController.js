import twilio from 'twilio';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';
dotenv.config();

// Initialize Twilio client
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Generate a random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// Store OTPs temporarily (in production, use a database)
const otpStore = new Map();

export const sendOtpController = async (req, res) => {
    try {
        const { phone } = req.body;

        // Validate input
        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Please enter your phone number"
            });
        }

        // Generate OTP
        const otp = generateOTP();
        
        // Store OTP with timestamp (valid for 5 minutes)
        otpStore.set(phone, {
            otp,
            timestamp: Date.now(),
            attempts: 0
        });

        // Send OTP via Twilio
        try {
            await client.messages.create({
                body: `Your OTP for registration is: ${otp}. Valid for 5 minutes.`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone
            });
            logger.info('OTP sent successfully to ' + req.body.phone);
            res.status(200).json({
                success: true,
                message: "OTP sent successfully"
            });
        } catch (twilioError) {
            console.error('Twilio Error:', twilioError);
            logger.error('Error in sendOtpController: ' + twilioError.message);
            res.status(500).json({
                success: false,
                message: "Failed to send OTP"
            });
        }
    } catch (error) {
        console.error('Error in sendOtpController:', error);
        logger.error('Error in sendOtpController: ' + error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const verifyOtpController = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        // Validate input
        if (!phone || !otp) {
            return res.status(400).json({
                success: false,
                message: "Phone and OTP are required"
            });
        }

        // Get stored OTP data
        const storedData = otpStore.get(phone);

        // Check if OTP exists
        if (!storedData) {
            logger.error('No OTP found for this number: ' + phone);
            return res.status(400).json({
                success: false,
                message: "No OTP found for this number"
            });
        }

        // Check if OTP is expired (5 minutes)
        if (Date.now() - storedData.timestamp > 5 * 60 * 1000) {
            otpStore.delete(phone);
            logger.error('OTP has expired for this number: ' + phone);
            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            });
        }

        // Increment attempts
        storedData.attempts += 1;

        // Check max attempts (3)
        if (storedData.attempts >= 3) {
            otpStore.delete(phone);
            logger.error('Max attempts reached for this number: ' + phone);
            return res.status(400).json({
                success: false,
                message: "Max attempts reached. Please request new OTP"
            });
        }

        // Verify OTP
        if (storedData.otp.toString() === otp.toString()) {
            // OTP verified successfully
            otpStore.delete(phone); // Clear OTP data

            // Here you would typically save the user to your database
            // For now, just return success
            logger.info('OTP verified successfully for number: ' + phone);
            res.status(200).json({
                success: true,
                message: "OTP verified successfully",
                user: {
                    phone: phone
                }
            });
        } else {
            logger.error('Invalid OTP for number: ' + phone);
            res.status(400).json({
                success: false,
                message: "Invalid OTP",
                remainingAttempts: 3 - storedData.attempts
            });
        }
    } catch (error) {
        console.error('Error in verifyOtpController:', error);
        logger.error('Error in verifyOtpController: ' + error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

