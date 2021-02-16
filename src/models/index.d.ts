import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private"
}

export declare class S3Object {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
  constructor(init: ModelInit<S3Object>);
}

export declare class Request {
  readonly id: string;
  readonly name: string;
  readonly alpha2Code: string;
  readonly image?: S3Object;
  constructor(init: ModelInit<Request>);
  static copyOf(source: Request, mutator: (draft: MutableModel<Request>) => MutableModel<Request> | void): Request;
}

export declare class Response {
  readonly id: string;
  readonly name: string;
  readonly alpha2Code: string;
  readonly image?: S3Object;
  constructor(init: ModelInit<Response>);
  static copyOf(source: Response, mutator: (draft: MutableModel<Response>) => MutableModel<Response> | void): Response;
}