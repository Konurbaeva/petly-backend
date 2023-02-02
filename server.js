const app = require("./app");
const connectMongo = require("./db/connection");
const PORT = 8080;

const start = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    // todo - normal error type
    console.log("status 500, server or db error " + error);
    process.exit();
  }
};

start();
