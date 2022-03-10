import Principal "mo:base/Principal";

module {
    public type TokenAddress = Principal;
    public type TokenId = Nat;
    
    public type SeedResponse = {
        seed : Nat;
        sign : Text;
    }
}