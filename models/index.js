// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Request, Response } = initSchema(schema);

export {
  Request,
  Response
};