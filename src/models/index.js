// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Visibility = {
  "PUBLIC": "public",
  "PRIVATE": "private"
};

const { Request, Response, S3Object } = initSchema(schema);

export {
  Request,
  Response,
  Visibility,
  S3Object
};