import { TASKS, type TaskMeta } from "./tasks.generated";

export type { TaskMeta };
export { TASKS };

export function getTask(taskId: string): TaskMeta | undefined {
  return TASKS.find((t) => t.id === taskId.toLowerCase());
}

export function adjacentTask(
  taskId: string,
  dir: 1 | -1
): TaskMeta | undefined {
  const i = TASKS.findIndex((t) => t.id === taskId.toLowerCase());
  if (i === -1) return undefined;
  return TASKS[i + dir];
}
