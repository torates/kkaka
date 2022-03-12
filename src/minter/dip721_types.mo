import Principal "mo:base/Principal";

module {
    public type TokenAddress = Principal;
    public type TokenId = Nat;
    
    public type SeedResponse = {
        seed : Nat;
        sign : Text;
    };

    public type GeneratedNft = {
        seed : Text;
        metadata : [Nat8];
    };

    public type Buyer = {
        buyer : Principal;
        paid : Nat;
    }
}