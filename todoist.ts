import type { QueryProviderEvent } from "$sb/app_event.ts";
import { applyQuery, evalQueryExpression, liftAttributeFilter } from "$sb/lib/query.ts";
import { evalQueryExpression } from "$sb/lib/query_expression.ts";
import { TodoistApi } from 'todoist';
import { readSecrets } from "$sb/lib/secrets_page.ts";

export async function getTasks({ query }: QueryProviderEvent): Promise<any[]> {
  const [token] = await readSecrets(["todoistToken"]);
  const api = await new TodoistApi(token);

  const filterString = liftAttributeFilter(query.filter, "filter");

  if (!filterString) {
    throw Error("No 'filter' specified, this is mandatory");
  }

  const filter: string = evalQueryExpression(filterString, {});

  const tasks = await api.getTasks({filter: filter});

  const result = applyQuery(
    query,
    tasks.map((p) => flattenObject(p)),
  );

  return result;
}

export async function addTask(pageName: string, text: string) {
  const [token] = await readSecrets(["todoistToken"]);
  const api = await new TodoistApi(token);
}

function flattenObject(obj: any, prefix = ""): any {
  let result: any = {};
  for (let [key, value] of Object.entries(obj)) {
    if (prefix) {
      key = prefix + "_" + key;
    }
    if (value && typeof value === "object") {
      result = { ...result, ...flattenObject(value, key) };
    } else {
      result[key] = value;
    }
  }
  return result;
}
