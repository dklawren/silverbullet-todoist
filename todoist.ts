import { flashNotification } from "https://deno.land/x/silverbullet@0.9.2/plug-api/syscalls/editor.ts";
import { readSetting } from "https://deno.land/x/silverbullet@0.9.2/plug-api/lib/settings_page.ts";

const settingsKey = "todoist";

type TodoistConfig = {
  userCount: number,
};

const defaultConfig: TodoistConfig = {
  userCount: 1,
}

export async function getTasks() {
  const config = { ...defaultConfig, ...(await readSetting(settingsKey, {})) };
  const selectedUserId = 1 + Math.floor(Math.random() * config.userCount);
  console.log(config, selectedUserId);

  const result = await fetch(
    `https://jsonplaceholder.typicode.com/users/${selectedUserId}`
  );
  if (result.status < 200 || result.status >= 300) {
    throw new Error(await result.text());
  }
  const data = await result.json();
  await flashNotification(data["name"]);
}

export async function addTask() {
  await flashNotification("Adding task!");
}
