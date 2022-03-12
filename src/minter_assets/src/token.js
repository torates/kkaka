export const idlFactory = ({ IDL }) => {
  const TxReceipt = IDL.Record({ 'ok' : IDL.Nat });
  const Metadata = IDL.Record({
    'decimals' : IDL.Nat8,
    'owner' : IDL.Principal,
    'logo' : IDL.Text,
    'name' : IDL.Text,
    'totalSupply' : IDL.Nat,
    'symbol' : IDL.Text,
  });
  const Time = IDL.Int;
  const TokenInfo = IDL.Record({
    'holderNumber' : IDL.Nat,
    'deployTime' : Time,
    'metadata' : Metadata,
    'historySize' : IDL.Nat,
    'cycles' : IDL.Nat,
  });
  const Token = IDL.Service({
    '_transfer' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [TxReceipt],
        [],
      ),
    'allowance' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'decimals' : IDL.Func([], [IDL.Nat8], ['query']),
    'getAllowanceSize' : IDL.Func([], [IDL.Nat], ['query']),
    'getHolders' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))],
        ['query'],
      ),
    'getMetadata' : IDL.Func([], [Metadata], ['query']),
    'getTokenInfo' : IDL.Func([], [TokenInfo], ['query']),
    'getUserApprovals' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))],
        ['query'],
      ),
    'historySize' : IDL.Func([], [IDL.Nat], ['query']),
    'logo' : IDL.Func([], [IDL.Text], ['query']),
    'mint' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
  });
  return Token;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Text, IDL.Text, IDL.Nat8, IDL.Nat, IDL.Principal];
};
