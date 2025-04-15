import type { AnyZodObject, ZodSchema } from "zod";
import type { RouteConfig } from "@hono/zod-openapi";
import type { ZodEffects } from "zod";

type getRouteProps = {
  path: any;
  paramsSchema?: ZodSchema<any>;
  responsesSchema: ZodSchema<any>;
  querySchema?: ZodSchema<any>;
  tags: string;
  description?: string;
  summary?: string;
};

export const getRoute = (
  props: getRouteProps
): Omit<RouteConfig, "path"> & { path: string } => {
  return {
    method: "get",
    path: props.path,
    summary: props.summary,
    tags: [props.tags],
    description: props.description,
    request: {
      params: props.paramsSchema as AnyZodObject | ZodEffects<any>,
      query: props.querySchema as AnyZodObject | ZodEffects<any>,
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
