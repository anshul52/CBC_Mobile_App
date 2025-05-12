export const SQL_QUERIES = {
  INSERT_OTP: "INSERT INTO otp_logs (phone, otp, expires_at) VALUES (?, ?, ?)",
  SELECT_LATEST_OTP:"SELECT * FROM otp_logs WHERE phone = ? ORDER BY created_at DESC LIMIT 1",
  DELETE_OTP: "DELETE FROM otp_logs WHERE id = ?",
  UPDATE_ATTEMPTS: "UPDATE otp_logs SET attempts = attempts + 1 WHERE id = ?",
  MARK_OTP_VERIFIED: "UPDATE otp_logs SET is_verified = TRUE WHERE id = ?",
  SELECT_USER: "SELECT * FROM users WHERE phone = ?",
  INSERT_USER: "INSERT INTO users (phone) VALUES (?)",
  SELECT_USER_DETAILS: "SELECT * FROM users WHERE id = ?",
};

export const SPORTS_QUERIES = {
  SELECT_SPORTS_DETAILS: `
  SELECT 
  f.name AS facility_name,
  o.day_type,
  TIME_FORMAT(o.open_time, '%H:%i') AS open_time,
  TIME_FORMAT(o.close_time, '%H:%i') AS close_time,
  TIME_FORMAT(p.start_time, '%H:%i') AS start_time,
  TIME_FORMAT(p.end_time, '%H:%i') AS end_time,
  p.price,
  p.price_type
  FROM facilities f
  JOIN operating_hours o 
  ON f.id = o.facility_id 
  AND o.day_type = get_day_type_for_date('2025-01-29')  -- Static Date for Now
  JOIN pricing_rules p 
  ON f.id = p.facility_id 
  AND p.day_type = get_day_type_for_date('2025-01-29')  -- Static Date for Now
  WHERE f.name = 'Badminton Courts'
  ORDER BY p.start_time
    `,
  SELECT_SPORTS_DETAILS_DAY_WISE: `
  SELECT
  f.id AS facility_id,
  f.name AS facility_name,
  dt.id AS day_type_id,
  dt.name AS day_type_name,
  dtd.weekday AS day,
  oh.open_time,
  oh.close_time,
  pr.start_time AS pricing_start_time,
  pr.end_time AS pricing_end_time,
  pr.price,
  pr.unit,
  er.item_name AS rental_item,
  er.price AS rental_price
  FROM facilities f
  JOIN operating_hours oh ON f.id = oh.facility_id
  JOIN day_types dt ON oh.day_type_id = dt.id
  JOIN day_type_days dtd ON dt.id = dtd.day_type_id
  LEFT JOIN pricing_rules pr ON f.id = pr.facility_id AND pr.day_type_id = dt.id
  LEFT JOIN equipment_rentals er ON f.id = er.facility_id
  WHERE dtd.weekday = ?
    `,
  SELECT_SPORTS_DETAILS_FACILITY_WISE: `SELECT 
  oh.id,
  f.name AS name,
  oh.facility_id,
  oh.day_type_id,
  dt.name AS day,
  oh.open_time,
  oh.close_time,
  pr.start_time AS pricing_start_time,
  pr.end_time AS pricing_end_time,
  pr.price,
  pr.unit,
  er.item_name AS rental_item,
  er.price AS rental_price
  FROM facilities f
  INNER JOIN operating_hours oh ON f.id = oh.facility_id 
  INNER JOIN day_types dt ON oh.day_type_id = dt.id 
  LEFT JOIN pricing_rules pr ON pr.facility_id = f.id AND pr.day_type_id = dt.id
  LEFT JOIN equipment_rentals er ON er.facility_id = f.id
  WHERE f.id = ?`, 
};
