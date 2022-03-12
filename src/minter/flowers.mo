module {
  public type Metadata = {
    decimals : Nat8;
    owner : Principal;
    logo : Text;
    name : Text;
    totalSupply : Nat;
    symbol : Text;
  };
  public type Time = Int;
  public type TokenInfo = {
    holderNumber : Nat;
    deployTime : Time;
    metadata : Metadata;
    historySize : Nat;
    cycles : Nat;
  };
  public type TxReceipt = { ok : Nat };
  public type Self = actor {
    _transfer : shared (Principal, Principal, Nat) -> async TxReceipt;
    allowance : shared query (Principal, Principal) -> async Nat;
    balanceOf : shared query Principal -> async Nat;
    decimals : shared query () -> async Nat8;
    getAllowanceSize : shared query () -> async Nat;
    getHolders : shared query (Nat, Nat) -> async [(Principal, Nat)];
    getMetadata : shared query () -> async Metadata;
    getTokenInfo : shared query () -> async TokenInfo;
    getUserApprovals : shared query Principal -> async [(Principal, Nat)];
    historySize : shared query () -> async Nat;
    logo : shared query () -> async Text;
    mint : shared (Principal, Nat) -> async TxReceipt;
    name : shared query () -> async Text;
    symbol : shared query () -> async Text;
    totalSupply : shared query () -> async Nat;
  }
}