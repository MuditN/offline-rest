import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Request {
  readonly id: string;
  readonly name: string;
  readonly alpha2Code: string;
  constructor(init: ModelInit<Request>);
  static copyOf(source: Request, mutator: (draft: MutableModel<Request>) => MutableModel<Request> | void): Request;
}

export declare class Response {
  readonly id: string;
  readonly name: string;
  readonly alpha2Code: string;
  constructor(init: ModelInit<Response>);
  static copyOf(source: Response, mutator: (draft: MutableModel<Response>) => MutableModel<Response> | void): Response;
}