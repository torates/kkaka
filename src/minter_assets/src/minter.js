export const idlFactory = ({ IDL }) => {
  const TokenId = IDL.Nat;
  const TxReceipt = IDL.Record({ 'ok' : IDL.Nat });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const StreamingCallbackToken = IDL.Record({
    'key' : IDL.Text,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'index' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const StreamingCallbackHttpResponse = IDL.Record({
    'token' : IDL.Opt(StreamingCallbackToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingCallbackToken,
      'callback' : IDL.Func(
          [StreamingCallbackToken],
          [StreamingCallbackHttpResponse],
          ['query'],
        ),
    }),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const DRC721 = IDL.Service({
    'approve' : IDL.Func([IDL.Principal, TokenId], [], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Opt(IDL.Nat)], []),
    'confirmPayed' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'flowerTransfer' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [TxReceipt],
        [],
      ),
    'getApproved' : IDL.Func([IDL.Nat], [IDL.Principal], []),
    'getBalanceFlowers' : IDL.Func([IDL.Principal], [IDL.Nat], []),
    'getowner' : IDL.Func([], [IDL.Principal], ['query']),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'isApprovedForAll' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Bool],
        [],
      ),
    'mint' : IDL.Func([IDL.Vec(IDL.Nat)], [IDL.Nat], []),
    'mintWithFlowers' : IDL.Func([IDL.Vec(IDL.Nat)], [IDL.Nat], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'ownerOf' : IDL.Func([TokenId], [IDL.Opt(IDL.Principal)], []),
    'setApprovalForAll' : IDL.Func([IDL.Principal, IDL.Bool], [], ['oneway']),
    'setBalance' : IDL.Func([], [IDL.Nat], []),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'tokenPknow' : IDL.Func([], [IDL.Nat], ['query']),
    'tokenURI' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Vec(IDL.Nat))], ['query']),
    'totalSpent' : IDL.Func([IDL.Principal], [IDL.Nat], []),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [],
        ['oneway'],
      ),
  });
  return DRC721;
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Text, IDL.Text];
};
