import Error "mo:base/Error";
import Cycles "mo:base/ExperimentalCycles";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import T "dip721_types";
import Nat64 "mo:base/Nat64";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";
import Blob "mo:base/Blob";

import Ledger "ledger";
import Token "flowers";
import SVG "SVG";
import Traits "Traits";
import AssetStorage "assetstorage";
import AccountGen "Account";

import Hex "Hex";



/* import Seeder "seeder"; */

actor class DRC721(_Owner : Principal, _name : Text, _symbol : Text) {

    type SeedResponse = T.SeedResponse;
    type GeneratedNft = T.GeneratedNft;
    type Buyer = T.Buyer;

    type TxReceipt = Token.TxReceipt;
    type AccountBalanceArgs = Ledger.AccountBalanceArgs;
    type AccountIdentifier = Ledger.AccountIdentifier;
    type TransferFee = Ledger.TransferFee;
    type Tokens = Ledger.Tokens;


    let LedgerCanister : Ledger.Self = actor "ryjl3-tyaaa-aaaaa-aaaba-cai";
    let TokenCanister : Token.Self = actor "6xkgy-yyaaa-aaaah-abdda-cai";



    //Using DIP721 standard, adapted from https://github.com/SuddenlyHazel/DIP721/blob/main/src/DIP721/DIP721.mo
    private stable var tokenPk : Nat = 0;

    private stable var tokenURIEntries : [(Text, [Nat])] = [];
    private stable var tokenSVGEntries : [(Text, Text)] = [];
    private stable var ownersEntries : [(T.TokenId, Principal)] = [];
    private stable var balancesEntries : [(Principal, Nat)] = [];
    private stable var balancesFlowersEntries : [(Principal, Nat)] = [];
    private stable var tokenApprovalsEntries : [(T.TokenId, Principal)] = [];
    private stable var operatorApprovalsEntries : [(Principal, [Principal])] = [];  

    var userNfts : [GeneratedNft] = [];
    var oldBalance : Nat = 0;


    private let tokenURIs : HashMap.HashMap<Text, [Nat]> = HashMap.fromIter<Text, [Nat]>(tokenURIEntries.vals(), 10, Text.equal, Text.hash);
    private let tokenSVGs : HashMap.HashMap<Text, Text> = HashMap.fromIter<Text, Text>(tokenSVGEntries.vals(), 10, Text.equal, Text.hash);
    private let owners : HashMap.HashMap<T.TokenId, Principal> = HashMap.fromIter<T.TokenId, Principal>(ownersEntries.vals(), 10, Nat.equal, Hash.hash);    
    private let balances : HashMap.HashMap<Principal, Nat> = HashMap.fromIter<Principal, Nat>(balancesEntries.vals(), 10, Principal.equal, Principal.hash);
    private let balancesFlowers : HashMap.HashMap<Principal, Nat> = HashMap.fromIter<Principal, Nat>(balancesFlowersEntries.vals(), 0, Principal.equal, Principal.hash);
    private let tokenApprovals : HashMap.HashMap<T.TokenId, Principal> = HashMap.fromIter<T.TokenId, Principal>(tokenApprovalsEntries.vals(), 10, Nat.equal, Hash.hash);
    private let operatorApprovals : HashMap.HashMap<Principal, [Principal]> = HashMap.fromIter<Principal, [Principal]>(operatorApprovalsEntries.vals(), 10, Principal.equal, Principal.hash);

    var buyers : [Buyer] = [];

    let mintAmount : Nat = 500;

/*     public shared func amountFee() : async Nat64 {
        let ret  = await LedgerCanister.transfer_fee{};
        let retTokens = ret.transfer_fee;
        let retE8s = retTokens.e8s;
        return retE8s;
    }; */

    let amountPaid : Nat64 = 1_000_000;

    let fooreceip : TxReceipt = {
        ok = 1;
    };

    var accountBal : AccountBalanceArgs = {
        account = [];
    };

    public shared func balanceOf(p : Principal) : async ?Nat {
        return balances.get(p);
    };

    public shared func ownerOf(tokenId : T.TokenId) : async ?Principal {
        return _ownerOf(tokenId);
    };

    public shared query func tokenURI(tokenId : Text) : async ?[Nat] {
        return _tokenURI(tokenId);
    };

    public shared query func name() : async Text {
        return _name;
    };

    public shared query func getowner() : async Principal {
        return _Owner;
    };

    public shared query func symbol() : async Text {
        return _symbol;
    };

    public shared query func tokenPknow() : async Nat {
        let pk2 = tokenPk;
        return pk2;
    };

    public shared func isApprovedForAll(owner : Principal, opperator : Principal) : async Bool {
        return _isApprovedForAll(owner, opperator);
    };

    public shared(msg) func approve(to : Principal, tokenId : T.TokenId) : async () {
        switch(_ownerOf(tokenId)) {
            case (?owner) {
                 assert to != owner;
                 assert msg.caller == owner or _isApprovedForAll(owner, msg.caller);
                 _approve(to, tokenId);
            };
            case (null) {
                throw Error.reject("No owner for token")
            };
        }
    };

    public shared func getApproved(tokenId : Nat) : async Principal {
        switch(_getApproved(tokenId)) {
            case (?v) { return v };
            case null { throw Error.reject("None approved")}
        }
    };

    public shared(msg) func setApprovalForAll(op : Principal, isApproved : Bool) : () {
        assert msg.caller != op;

        switch (isApproved) {
            case true {
                switch (operatorApprovals.get(msg.caller)) {
                    case (?opList) {
                        var array = Array.filter<Principal>(opList,func (p) { p != op });
                        array := Array.append<Principal>(array, [op]);
                        operatorApprovals.put(msg.caller, array);
                    };
                    case null {
                        operatorApprovals.put(msg.caller, [op]);
                    };
                };
            };
            case false {
                switch (operatorApprovals.get(msg.caller)) {
                    case (?opList) {
                        let array = Array.filter<Principal>(opList, func(p) { p != op });
                        operatorApprovals.put(msg.caller, array);
                    };
                    case null {
                        operatorApprovals.put(msg.caller, []);
                    };
                };
            };
        };
        
    };

    public shared(msg) func transferFrom(from : Principal, to : Principal, tokenId : Nat) : () {
        assert _isApprovedOrOwner(msg.caller, tokenId);

        _transfer(from, to, tokenId);
    };

    let canisterIdd : Principal = Principal.fromText("7thjk-byaaa-aaaah-abdfa-cai");

    public shared(msg) func mint(uri : [Nat], to : Principal) : async Nat {
        assert(msg.caller == canisterIdd);
        tokenPk += 1;
        _mint(to, tokenPk, uri);

        //uncomment the following code if you want mint to return the svg html tag with your NFT

/*         let base64this : Text = SVG.make(Traits.getBg(Traits.bgRarity(uri[0])), Traits.getPot(Traits.bgRarity(uri[1])), Traits.getStem(Traits.bgRarity(uri[2])), Traits.getPetal(Traits.bgRarity(uri[3])));
        tokenSVGs.put(Nat.toText(tokenPk), base64this);
        return base64this; */

        return tokenPk;

    };

    public shared func getBalanceFlowers(princ : Principal) : async Nat {
        await TokenCanister.balanceOf(princ);
    };

    public shared(msg) func flowerTransfer(from : Principal, to : Principal, amount : Nat) : async TxReceipt {
        assert(msg.caller == canisterIdd);
        await TokenCanister._transfer(from, to, amount);
    };

/*     public shared(msg) func putFlowerBal(princ : Principal) : async ?Nat {
        assert(msg.caller == canisterIdd);
        balancesFlowers.put(msg.caller, await getBalanceFlowers(princ));
        return balancesFlowers.get(msg.caller);
    }; */

    public shared(msg) func mintWithFlowers(arr : [Nat]) : async Nat { //returns the txId
        let balanceCall : Nat = await getBalanceFlowers(msg.caller);
        if(balanceCall >= mintAmount) {
            ignore await flowerTransfer(msg.caller, canisterIdd, mintAmount); //takes the mint amount from the buyer
            ignore await mint(arr, msg.caller); //mins with arr
            return tokenPk;
        } else {
            return 9999; //not enough funds
        }
    };


    public shared(msg) func setBalance() : async Nat { //required to call after deployment
        (assert msg.caller == _Owner);
        switch (Hex.decode("689064ed384111086dee629723263135b71f7c330b162431a0a41be25066f36a")) {
            case (#ok(acc)) {
                var localaccountBal : AccountBalanceArgs = {
                    account = acc;
                };
                accountBal := localaccountBal;
                let temp : Tokens = await LedgerCanister.account_balance(accountBal);
                let tempE8s : Nat64 = temp.e8s;
                oldBalance := Nat64.toNat(tempE8s);

                return oldBalance;
            };
            case (#ok(_)) {
                return 0;
            };
            case (#err(err)) {
                return 0;
            };
            case (#err(_)) {
                return 0;
            };
        };
    };

/* This payment verification system is very slow and will fail under a low to mid amount of TX volume, but a similar idea could be made to scale if instead of setting a 
fixed account to receive all payments and verify, generate a new subaccount to receive each payment and verify to it.
No time to write this from scratch so my slow model will have to suffice 😜*/


    public shared(msg) func confirmPayed(amount : Nat) : async Bool {
        let temp : Tokens = await LedgerCanister.account_balance(accountBal);
        let tempE8s : Nat64 = temp.e8s;
        var newBalance = Nat64.toNat(tempE8s);
        let balDiff : Nat = newBalance - oldBalance; //no need to take the fee
        let toPay : Nat = Nat64.toNat(amountPaid);

        if(balDiff == toPay) { //toPay is fixed for simplicity, but  it should ideally be n * price with n being amount of tokens to buy instead of 0.01 icp
            let thisBuyer : Buyer = {
                buyer = msg.caller;
                paid = toPay;
            };
            buyers := Array.append(buyers, [thisBuyer]);
            ignore await TokenCanister._transfer(canisterIdd, msg.caller, 500);
            return true;
        } else {
            return false; //failed
        };
    };

    public shared(msg) func totalSpent(buyer : Principal) : async Nat { 
        //total of ICP paid by a buyer
        var totalToReturn : Nat = 0;
        for(i in buyers.vals()){
            if(i.buyer == buyer) {
                totalToReturn += i.paid;
            };
        };
        return totalToReturn;

    };

    // Internal

    private func _ownerOf(tokenId : T.TokenId) : ?Principal {
        return owners.get(tokenId);
    };

    private func _tokenURI(tokenId : Text) : ?[Nat] {
        return tokenURIs.get(tokenId);
    };

    private func _isApprovedForAll(owner : Principal, opperator : Principal) : Bool {
        switch (operatorApprovals.get(owner)) {
            case(?whiteList) {
                for (allow in whiteList.vals()) {
                    if (allow == opperator) {
                        return true;
                    };
                };
            };
            case null {return false;};
        };
        return false;
    };

    private func _approve(to : Principal, tokenId : Nat) : () {
        tokenApprovals.put(tokenId, to);
    };

    private func _removeApprove(tokenId : Nat) : () {
        let _ = tokenApprovals.remove(tokenId);
    };

    private func _exists(tokenId : Nat) : Bool {
        return Option.isSome(owners.get(tokenId));
    };

    private func _getApproved(tokenId : Nat) : ?Principal {
        assert _exists(tokenId) == true;
        switch(tokenApprovals.get(tokenId)) {
            case (?v) { return ?v };
            case null {
                return null;
            };
        }
    };

    private func _hasApprovedAndSame(tokenId : Nat, spender : Principal) : Bool {
        switch(_getApproved(tokenId)) {
            case (?v) {
                return v == spender;
            };
            case null { return false}
        }
    };

    private func _isApprovedOrOwner(spender : Principal, tokenId : Nat) : Bool {
        assert _exists(tokenId);
        let owner = Option.unwrap(_ownerOf(tokenId));
        return spender == owner or _hasApprovedAndSame(tokenId, spender) or _isApprovedForAll(owner, spender);
    };
/* 
    private func _addUserNfts(user : Text, nft : [Nat]) {
        let nft : GeneratedNft = {
            seed = user;
            metadata = nft;
        }
        Array.append(userNfts, [nft]);
    }; */

    private func _transfer(from : Principal, to : Principal, tokenId : Nat) : () {
        assert _exists(tokenId);
        assert Option.unwrap(_ownerOf(tokenId)) == from;

        // Bug in HashMap https://github.com/dfinity/motoko-base/pull/253/files
        // this will throw unless you patch your file
        _removeApprove(tokenId);

        _decrementBalance(from);
        _incrementBalance(to);
        owners.put(tokenId, to);
    };

    private func _incrementBalance(address : Principal) {
        switch (balances.get(address)) {
            case (?v) {
                balances.put(address, v + 1);
            };
            case null {
                balances.put(address, 1);
            }
        }
    };

    private func _decrementBalance(address : Principal) {
        switch (balances.get(address)) {
            case (?v) {
                balances.put(address, v - 1);
            };
            case null {
                balances.put(address, 0);
            }
        }
    };

    private func _mint(to : Principal, tokenId : Nat, uri : [Nat]) : () {
        assert not _exists(tokenId);

        _incrementBalance(to);
        owners.put(tokenId, to);
        tokenURIs.put(Nat.toText(tokenId), uri);
        
    };

    private func _burn(tokenId : Nat) {
        let owner = Option.unwrap(_ownerOf(tokenId));

        _removeApprove(tokenId);
        _decrementBalance(owner);

        ignore owners.remove(tokenId);
    };

    let NOT_FOUND : HttpResponse = {status_code = 404; headers = []; body = []; streaming_strategy = null};
    let BAD_REQUEST : HttpResponse = {status_code = 400; headers = []; body = []; streaming_strategy = null};

    type HttpRequest = AssetStorage.HttpRequest;
    type HttpResponse = AssetStorage.HttpResponse;

    public query func http_request(request : HttpRequest) : async HttpResponse {
        let path = Iter.toArray(Text.tokens(request.url, #text("/")));
        switch(_getTokenData(_getParam(request.url, "tokenid"))) {
            case (?metadata) {
                
                return {
                    status_code = 200;
                    headers = [("Content-Type", "text/html; charset=UTF-8")];
                    body = Blob.toArray(SVG.makeEncoded(Traits.getBg(Traits.bgRarity(metadata[0])), Traits.getPot(Traits.bgRarity(metadata[1])), Traits.getStem(Traits.bgRarity(metadata[2])), Traits.getPetal(Traits.bgRarity(metadata[3]))));
                    streaming_strategy = null;
                };
            };
            case (_) {
                return {
                    status_code = 200;
                    headers = [("content-type", "text/plain")];
                    body = Blob.toArray(Text.encodeUtf8("Cycle Balance:                            ~" # debug_show (Cycles.balance()/1000000000000) # "T\n" # "Wrapped NFTs:                             " # debug_show (tokenPk) # "\n"));
                    streaming_strategy = null;
                };
            };
        };
    };


    func _getTokenData(tokenid : ?Text) : ?[Nat] {
        switch (tokenid) {
            case (?token) {
                let tokenind = _tokenURI(token);
                return tokenind;
            }; case (_) {
                return null;
            };
        };
    };

    func _getParam(url : Text, param : Text) : ?Text {
        var _s : Text = url;
        Iter.iterate<Text>(Text.split(_s, #text("/")), func(x, _i) {
        _s := x;
        });
        Iter.iterate<Text>(Text.split(_s, #text("?")), func(x, _i) {
        if (_i == 1) _s := x;
        });
        var t : ?Text = null;
        var found : Bool = false;
        Iter.iterate<Text>(Text.split(_s, #text("&")), func(x, _i) {
        Iter.iterate<Text>(Text.split(x, #text("=")), func(y, _ii) {
            if (_ii == 0) {
            if (Text.equal(y, param)) found := true;
            } else if (found == true) t := ?y;
        });
        });
        return t;
    };

    system func preupgrade() {
        tokenURIEntries := Iter.toArray(tokenURIs.entries());
        tokenSVGEntries := Iter.toArray(tokenSVGs.entries());
        ownersEntries := Iter.toArray(owners.entries());
        balancesEntries := Iter.toArray(balances.entries());
        balancesFlowersEntries := Iter.toArray(balancesFlowers.entries());
        tokenApprovalsEntries := Iter.toArray(tokenApprovals.entries());
        operatorApprovalsEntries := Iter.toArray(operatorApprovals.entries());
        
    };

    system func postupgrade() {
        tokenURIEntries := [];
        tokenSVGEntries := [];
        ownersEntries := [];
        balancesEntries := [];
        balancesFlowersEntries := [];
        tokenApprovalsEntries := [];
        operatorApprovalsEntries := [];
    };
};