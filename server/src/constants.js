// Ports and origins
const port = process.env.PORT || 8000;
const origin = process.env.ORIGIN;

// Database
const mongoURL = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

// JWT
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;

// Cookie parser secret
const cookieParserSecret = process.env.COOKIE_PARSER_SECRET;

// Email service credentials
const gmail = process.env.GMAIL;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

// Flag For Node Environment
const isProduction = process.env.NODE_ENV === "production";  

module.exports = { 
    port, 
    origin, 
    mongoURL, 
    dbName, 
    accessTokenSecret, 
    accessTokenExpiry,
    cookieParserSecret,
    gmail,
    gmailAppPassword,
    isProduction
};