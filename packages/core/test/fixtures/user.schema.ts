import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export default UserSchema;
