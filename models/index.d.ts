import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Country {
  readonly id: string;
  readonly name: string;
  readonly alpha2Code: string;
  constructor(init: ModelInit<Country>);
  static copyOf(source: Country, mutator: (draft: MutableModel<Country>) => MutableModel<Country> | void): Country;
}
