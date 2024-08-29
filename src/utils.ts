import fs from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "client.json");

export function readTargetUserId() {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
    targetId: string;
  };
  return data.targetId;
}

export function writeTargetUserId(id: string) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
    targetId: string;
  };
  data.targetId = id;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
