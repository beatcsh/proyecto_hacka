import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'createUser' : ActorMethod<[string, string, string, string, string], string>,
  'getMessage' : ActorMethod<[], string>,
  'getUsers' : ActorMethod<
    [],
    Array<
      {
        'id' : bigint,
        'username' : string,
        'telephone_emer' : string,
        'password' : string,
        'email' : string,
        'telephone' : string,
      }
    >
  >,
  'login' : ActorMethod<[string, string], string>,
  'setMessage' : ActorMethod<[string], undefined>,
  'testMessage' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
