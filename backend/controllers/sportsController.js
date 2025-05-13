import { executeQuery2 } from "../config/db.js";
import { SPORTS_QUERIES } from "../queries/queries.js";
import { RESPONSE_MESSAGES, LOG_MESSAGES } from "../constants/constants.js";
import logger from "../utils/logger.js";
export const getSportsController = async (req, res) => {
  try {
    const sports = await executeQuery2(SPORTS_QUERIES.SELECT_SPORTS_DETAILS);
    if (sports && sports.length > 0) {
      res.status(200).json({
        success: true,
        message: RESPONSE_MESSAGES.SPORTS_RETRIEVED_SUCCESSFULLY,
        sports: sports,
      });
    } else {
      res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.SPORTS_NOT_FOUND,
      });
    }
  } catch (error) {
    logger.error(LOG_MESSAGES.ERROR_IN_GET_SPORTS(error));
    console.log(error);
    res.status(500).json({
      success: false,
      message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getSportDetailsFacilityWiseController = async (req, res) => {
  try {
    const { sportId } = req.query;
    const sportDetails = await executeQuery2(
      SPORTS_QUERIES.SELECT_SPORTS_DETAILS_FACILITY_WISE,
      [sportId]
    );

    if (sportDetails && sportDetails.length > 0) {
      res.status(200).json({
        success: true,
        message: RESPONSE_MESSAGES.SPORTS_DETAILS_RETRIEVED_SUCCESSFULLY,
        sportDetails: sportDetails,
      });
    } else {
      res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.SPORTS_DETAILS_NOT_FOUND,
      });
    }
  } catch (error) {
    logger.error(LOG_MESSAGES.ERROR_IN_GET_SPORTS(error));
    console.log(error);
    res.status(500).json({
      success: false,
      message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getSportsDetailsDayWiseController = async (req, res) => {
  try {
    const { day } = req.query;
    const sportDetails = await executeQuery2(
      SPORTS_QUERIES.SELECT_SPORTS_DETAILS_DAY_WISE,
      [day]
    );
    if (sportDetails && sportDetails.length > 0) {
      res.status(200).json({
        success: true,
        message: RESPONSE_MESSAGES.SPORTS_RETRIEVED_SUCCESSFULLY,
        sportDetails: sportDetails,
      });
    } else {
      res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.SPORTS_DETAILS_NOT_FOUND,
      });
    }
  } catch (error) {
    logger.error(LOG_MESSAGES.ERROR_IN_GET_SPORTS(error));
    console.log(error);
    res.status(500).json({
      success: false,
      message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

export const eachFacilityWiseSportsDetailsController = async (req, res) => {
  try {
    


    const rows = await executeQuery2(`
      SELECT
        f.id AS facility_id,
        f.name AS facility_name,
        dt.id AS day_type_id,
        dt.name AS day_type_name,
        oh.open_time,
        oh.close_time,
        pr.start_time AS pricing_start_time,
        pr.end_time AS pricing_end_time,
        pr.price,
        pr.unit,
        er.item_name,
        er.price AS rental_price
      FROM facilities f
      LEFT JOIN operating_hours oh ON f.id = oh.facility_id
      LEFT JOIN day_types dt ON oh.day_type_id = dt.id
      LEFT JOIN pricing_rules pr ON f.id = pr.facility_id AND dt.id = pr.day_type_id
      LEFT JOIN equipment_rentals er ON f.id = er.facility_id
    `);
    
    const facilityMap = {};
    
    for (const row of rows) {
      const fid = row.facility_id;
      if (!facilityMap[fid]) {
        facilityMap[fid] = {
          facility_id: fid,
          facility_name: row.facility_name,
          operating_hours: [],
          pricing_rules: [],
          equipment_rentals: []
        };
      }
    
      if (
        row.day_type_id &&
        !facilityMap[fid].operating_hours.some(h => h.day_type_id === row.day_type_id)
      ) {
        facilityMap[fid].operating_hours.push({
          day_type_id: row.day_type_id,
          day_type_name: row.day_type_name,
          open_time: row.open_time,
          close_time: row.close_time
        });
      }
    
      if (
        row.pricing_start_time &&
        !facilityMap[fid].pricing_rules.some(
          p =>
            p.day_type_id === row.day_type_id &&
            p.start_time === row.pricing_start_time &&
            p.end_time === row.pricing_end_time
        )
      ) {
        facilityMap[fid].pricing_rules.push({
          day_type_id: row.day_type_id,
          day_type_name: row.day_type_name,
          start_time: row.pricing_start_time,
          end_time: row.pricing_end_time,
          price: row.price,
          unit: row.unit
        });
      }
    
      if (
        row.item_name &&
        !facilityMap[fid].equipment_rentals.some(e => e.item_name === row.item_name)
      ) {
        facilityMap[fid].equipment_rentals.push({
          item_name: row.item_name,
          price: row.rental_price
        });
      }
    }
    
    const result = {
      success: true,
      message: "Facility details retrieved successfully",
      facilities: Object.values(facilityMap)
    };
    

    if (rows && rows.length > 0) {
      res.status(200).json({
        success: true,
        message: RESPONSE_MESSAGES.SPORTS_DETAILS_RETRIEVED_SUCCESSFULLY,
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.SPORTS_DETAILS_NOT_FOUND,
      });
    }
  } catch (error) {
    logger.error(LOG_MESSAGES.ERROR_IN_GET_SPORTS(error));
    console.log(error);
  }
};