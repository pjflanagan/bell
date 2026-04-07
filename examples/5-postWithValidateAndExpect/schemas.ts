import { z } from 'zod';

export const EndpointRequestBody = z.object({
  name: z.string(),
  status: z.string(),
});

export const EndpointResponseBody = z.object({
  json: z.object({
    name: z.string(),
    status: z.string(),
  }),
});
