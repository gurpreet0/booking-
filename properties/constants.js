/*
    This file contains response status and messages.
*/

// Response status.
exports.responseFlags = {
  EMAIL_ALREADY_EXISTS            : 400,
  SUCCESSFULLY_REGISTERED         : 200,
  EMAIL_NOT_REGISTERED            : 404,
  WRONG_PASSWORD                  : 400,
  LOGIN_SUCCESSFUL                : 200,
  LOGIN_FIRST                     : 400,
  PASSWORD_CHANGED_SUCCESSFULLY   : 200,
  ENTER_A_VALID_RESET_CODE        : 400,
  LOGGED_OUT                      : 200,
  ERROR_READING_DATA              : 500,
  INTERNAL_ERROR                  : 500,
  RESET_CODE_SENT                 : 200,
  GENERATING_RESET_CODE           : 200,
  GENERATE_RESET_CODE_FIRST       : 400,
  IN_PROFILE                      : 200,
  IN_DASHBOARD                    : 200,
  HOME_PAGE                       : 200,
  MAIN_DOWNLOAD_PAGE              : 200,
  SELECTED_DOWNLOAD_PAGE          : 200,
  SELECTED_DOWNLOAD_ITEM          : 200,
  BAD_REQUEST                     : 400,
  BOOKING_SUCCESSFUL              : 200,
  DRIVER_ASSIGNED                 : 200,
  BOOKING_PENDING                 : 200,
  NOT_FOUND                       : 404,
  REQUEST_SUCCESSFUL              : 200,
  SUCCESS                         : 200,
  INVALID_TOKEN                   : 400,
  ACCESS_DENIED                   : 400,
  DRIVER_BUSY                     : 400,
  DRIVER_BLOCKED                  : 400
  }

// Response message.
exports.responseMessages = {
  EMAIL_ALREADY_EXISTS            : "EMAIL_ALREADY_EXISTS",
  SUCCESSFULLY_REGISTERED         : "SUCCESSFULLY_REGISTERED",
  EMAIL_NOT_REGISTERED            : "EMAIL_NOT_REGISTERED",
  WRONG_PASSWORD                  : "WRONG_PASSWORD",
  LOGIN_SUCCESSFUL                : "LOGIN_SUCCESSFUL",
  LOGIN_FIRST                     : "LOGIN_FIRST",
  PASSWORD_CHANGED_SUCCESSFULLY   : "PASSWORD_CHANGED_SUCCESSFULLY",
  ENTER_A_VALID_RESET_CODE        : "ENTER_A_VALID_RESET_CODE",
  LOGGED_OUT                      : "LOGGED_OUT",
  ERROR_READING_DATA              : "ERROR_READING_DATA",
  INTERNAL_ERROR                  : "INTERNAL_ERROR",
  RESET_CODE_SENT                 : "RESET_CODE_SENT",
  GENERATING_RESET_CODE           : "GENERATING_RESET_CODE",
  GENERATE_RESET_CODE_FIRST       : "GENERATE_RESET_CODE_FIRST",
  IN_PROFILE                      : "IN_PROFILE",
  IN_DASHBOARD                    : "IN_DASHBOARD",
  HOME_PAGE                       : "HOME_PAGE",
  MAIN_DOWNLOAD_PAGE              : "MAIN_DOWNLOAD_PAGE",
  SELECTED_DOWNLOAD_PAGE          : "SELECTED_DOWNLOAD_PAGE",
  SELECTED_DOWNLOAD_ITEM          : "SELECTED_DOWNLOAD_ITEM",
  BAD_REQUEST                     : "BAD_REQUEST",
  BOOKING_SUCCESSFUL              : "BOOKING_SUCCESSFUL",
  DRIVER_ASSIGNED                 : "DRIVER_ASSIGNED",
  BOOKING_PENDING                 : "BOOKING_PENDING",
  NOT_FOUND                       : "NOT_FOUND",
  REQUEST_SUCCESSFUL              : "REQUEST_SUCCESSFUL",
  SUCCESS                         : "SUCCESS",
  INVALID_TOKEN                   : "INVALID_TOKEN",
  ACCESS_DENIED                   : "ACCESS_DENIED",
  DRIVER_BUSY                     : "DRIVER_BUSY",
  DRIVER_BLOCKED                  : "DRIVER_BLOCKED"
}