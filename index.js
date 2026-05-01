import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/common/config/db.js";
function main() {
  const PORT = process.env.PORT || 3000;
  const start = async () => {
    await  connectDB()
    app.listen(PORT, () => {
      console.log(`server is running on port:${PORT}`);
    });
  };
  start().catch((error) => {
    console.error(`server is crashed on running because of ${error.message}`);
    process.exit(1);
  });
}
main();
