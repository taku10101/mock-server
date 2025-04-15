import type { AnyZodObject, ZodSchema } from "zod";
import type { RouteConfig } from "@hono/zod-openapi";
import type { ZodEffects } from "zod";

type putRouteProps = {
  path: string;
  paramsSchema?: ZodSchema<any>;
  requestBodySchema: ZodSchema<any>;
  responsesSchema: ZodSchema<any>;
  tags: string;
  description?: string;
  summary?: string;
};

export const putRoute = (
  props: putRouteProps
): Omit<RouteConfig, "path"> & { path: string } => {
  return {
    method: "put",
    path: props.path,
    tags: [props.tags],
    summary: props.summary,
    description: props.description,
    request: {
      params: props.paramsSchema as AnyZodObject | ZodEffects<any>,
      body: {
        content: {
          "application/json": {
            schema: props.requestBodySchema,
          },
        },
      },
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
