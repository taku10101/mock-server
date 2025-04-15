import type { AnyZodObject, ZodSchema } from "zod";
import type { RouteConfig } from "@hono/zod-openapi";
import type { ZodEffects } from "zod";

type deleteRouteProps = {
  path: string;
  paramsSchema?: ZodSchema<any>;
  responsesSchema: ZodSchema<any>;
  tags: string;
  summary?: string;
  description?: string;
};

export const deleteRoute = (
  props: deleteRouteProps
): Omit<RouteConfig, "path"> & { path: string } => {
  return {
    method: "delete",
    path: props.path,
    summary: props.summary,
    tags: [props.tags],
    description: props.description,
    request: {
      params: props.paramsSchema as AnyZodObject | ZodEffects<any>,
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: props.responsesSchema,
          },
        },
        description: "Successful response",
      },

      404: {
        description: "Resource not found",
      },
      500: {
        description: "Internal server error",
      },
    },
  };
};
