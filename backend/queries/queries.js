export const SQL_QUERIES = {
    INSERT_OTP: 'INSERT INTO otp_logs (phone, otp, expires_at) VALUES (?, ?, ?)',
    SELECT_LATEST_OTP: 'SELECT * FROM otp_logs WHERE phone = ? ORDER BY created_at DESC LIMIT 1',
    DELETE_OTP: 'DELETE FROM otp_logs WHERE id = ?',
    UPDATE_ATTEMPTS: 'UPDATE otp_logs SET attempts = attempts + 1 WHERE id = ?',
    MARK_OTP_VERIFIED: 'UPDATE otp_logs SET is_verified = TRUE WHERE id = ?',
    SELECT_USER: 'SELECT * FROM users WHERE phone = ?',
    INSERT_USER: 'INSERT INTO users (phone) VALUES (?)',
    SELECT_USER_DETAILS: 'SELECT * FROM users WHERE id = ?',
  
};