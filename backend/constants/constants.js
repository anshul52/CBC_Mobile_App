// Constants for log messages
export const LOG_MESSAGES = {
    OTP_SENT_SUCCESS: (phone) => `OTP sent successfully to ${phone}`,
    NO_OTP_FOUND: (phone) => `No OTP found for this number: ${phone}`,
    OTP_EXPIRED: (phone) => `OTP has expired for this number: ${phone}`,
    MAX_ATTEMPTS_REACHED: (phone) => `Max attempts reached for this number: ${phone}`,
    INVALID_OTP: (phone) => `Invalid OTP for number: ${phone}`,
    NEW_USER_CREATED: (phone) => `New user created with phone: ${phone}`,
    EXISTING_USER_LOGGED_IN: (phone) => `Existing user logged in with phone: ${phone}`,
    ERROR_IN_SEND_OTP: (error) => `Error in sendOtpController: ${error.message}`,
    ERROR_IN_VERIFY_OTP: (error) => `Error in verifyOtpController: ${error.message}`,
    TWILIO_ERROR: (error) => `Twilio Error: ${error.message}`,
    OTP_MESSAGE: (otp) => `Your OTP for registration is: ${otp}. Valid for 5 minutes.`, 
};

// Constants for response messages
export const RESPONSE_MESSAGES = {
    PHONE_REQUIRED: "Please enter your phone number",
    OTP_REQUIRED: "Phone and OTP are required",
    OTP_HAS_EXPIRED: "OTP has expired",
    MAX_ATTEMPTS_MESSAGE: "Max attempts reached. Please request new OTP",
    INVALID_OTP_MESSAGE: "Invalid OTP",
    OTP_VERIFIED_SUCCESS: "OTP verified successfully",
    INTERNAL_SERVER_ERROR: "Internal server error",
    USER_CREATED_SUCCESS: "User created successfully",
    USER_LOGGED_IN_SUCCESS: "User logged in successfully",
    USER_NOT_FOUND: "User not found",
    USER_ALREADY_EXISTS: "User already exists",
    USER_CREATION_FAILED: "User creation failed",
    USER_LOGIN_FAILED: "User login failed",
    FAILED_TO_SEND_OTP: "Failed to send OTP",
};
