import Principal "mo:base/Principal";
import Char "mo:base/Char";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import T "dip721_types";
import Nat32 "mo:base/Nat32";

module {
    type SeedResponse = T.SeedResponse;

    public func make(princ : Principal) : SeedResponse {

        let chars = Principal.toText(princ).chars();

        var num : Nat32 = 0;

        label outer for(l in chars) {
            if(l == '-') {
                break outer; //this will break when it reaches to - in the principal!
            };
            num += Char.toNat32(l);

        };
        let seed : SeedResponse = {
            seed = Nat32.toNat(num) + Int.abs(Time.now());
            sign = Principal.toText(princ);
        };
        return seed;
    }
}