import { exec } from "node:child_process";

waitForServices();

function waitForServices(attempts = 0) {
  if (attempts === 0) {
    console.log("> Waiting for services");
  }
  exec("docker exec super-fit-postgres pg_isready", (_error, stdout) => {
    if (!stdout.includes("accepting connections")) {
      process.stdout.write(".");
      return waitForServices(attempts + 1);
    }
    console.log("\n> Services are ready");
  });
}
