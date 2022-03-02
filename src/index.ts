import { buildApplication } from "./application";
import { port } from "./config";
import { buildLogger } from "./lib/logger";

const logger = buildLogger();

const app = buildApplication(logger);

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
