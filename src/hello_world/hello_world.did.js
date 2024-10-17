export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createUser' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'getMessage' : IDL.Func([], [IDL.Text], ['query']),
    'getUsers' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Nat,
              'username' : IDL.Text,
              'telephone_emer' : IDL.Text,
              'password' : IDL.Text,
              'email' : IDL.Text,
              'telephone' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'login' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], ['query']),
    'setMessage' : IDL.Func([IDL.Text], [], []),
    'testMessage' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
