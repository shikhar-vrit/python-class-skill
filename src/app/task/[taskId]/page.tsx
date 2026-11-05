import { notFound } from "next/navigation";
import { TASKS, getTask, adjacentTask } from "@/lib/tasks";
import { SlideViewer } from "@/components/SlideViewer";

// Each /task/xxx becomes a real static route at build time, so refresh and
// direct links work on Vercel with no SPA fallback or rewrite rules.
export function generateStaticParams() {
  return TASKS.map((t) => ({ taskId: t.id }));
}

export function generateMetadata({ params }: { params: { taskId: string } }) {
  const task = getTask(params.taskId);
  return { title: task ? task.fullTitle : "Not found" };
}

export default function TaskDeckPage({ params }: { params: { taskId: string } }) {
  const task = getTask(params.taskId);
  if (!task) notFound();
  const prev = adjacentTask(task.id, -1);
  const next = adjacentTask(task.id, 1);
  return <SlideViewer day={task} prev={prev} next={next} kicker={`Task · ${task.source}`} />;
}
