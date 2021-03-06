module.exports = {
  local: {
    MONGO_DB_USERNAME: "admin",
    MONGO_DB_PASSWORD: "admin",
    get MONGO_DB_URL() {
      return "mongodb://localhost/lose-to-win";
    },
  },
  production: {
    MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME,
    MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD,
    get MONGO_DB_URL() {
      return `mongodb+srv://${this.MONGO_DB_USERNAME}:${this.MONGO_DB_PASSWORD}@cluster0.fpezm.mongodb.net/lose-to-win?retryWrites=true&w=majority`;
    },
  },
};
