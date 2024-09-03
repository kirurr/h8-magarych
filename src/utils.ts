import fs from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "magarych.json");

export function readTargetUserId(): string | null {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
      targetId: string;
    };
  } catch {
    return null;
  }
  return data.targetId;
}

export function writeTargetUserId(id: string) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
      targetId: string;
    };
  } catch {
    fs.writeFileSync(filePath, JSON.stringify({ targetId: id }, null, 2));
    return;
  }
  data.targetId = id;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
