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

 