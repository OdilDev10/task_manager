import { z } from "zod";
import TaskStatusEnum from "../enums/TaskStatusEnum";

// Validación para creación de usuario
export const TaskSchemaCreate = z.object({
  id: z.number().optional(),

  title: z.string().min(2, "Title is required"),
  content: z.string().min(2, "Description is required"),
  createdAt: z
    .preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : arg),
      z.date()
    )
    .optional(),
  updatedAt: z
    .union([
      z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg),
        z.date()
      ),
      z.null(),
    ])
    .optional(),
  status: z.enum([
    TaskStatusEnum.PENDING,
    TaskStatusEnum.CANCELLED,
    TaskStatusEnum.COMPLETED,
  ]),
  disabled: z.boolean(),
  disabled_at: z.null(),
  createdBy: z.number(),
  updatedBy: z.null(),
  disabledBy: z.null(),
});

// Validación para actualización de usuario
export const TaskSchemaUpdate = z.object({
  id: z.number().optional(),
  title: z.string().min(2, "Title is required").optional(),
  content: z.string().min(2, "Description is required").optional(),
  userId: z.number().optional(),
  createdAt: z
    .preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : arg),
      z.date()
    )
    .optional(),
  updatedAt: z
    .union([
      z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg),
        z.date()
      ),
      z.null(),
    ])
    .optional(),
});

// Exporta los tipos para usarlos en el resto de la app si es necesario
export type ITask = z.infer<typeof TaskSchemaCreate>;
export type ITaskUpdate = z.infer<typeof TaskSchemaUpdate>;
