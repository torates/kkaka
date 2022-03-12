import Traits "Traits";
import Blob "mo:base/Blob";
import Text "mo:base/Text";

module SVG {
    public func make(background : Text, pot : Text, stem : Text, petal : Text) : Text {
        let codetoReturn : Text = "<svg id='generated' style='width: 1280px;height: 1280px;' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 1280 1280' xml:space='preserve'><g><image href='data:image/png;base64,"#background#"'></image></g><g><image href='data:image/png;base64,"#pot#"'></image></g><g><image href='data:image/png;base64,"#stem#"'></image></g><g><image href='data:image/png;base64,"#petal#"'></image></g></svg>";
        return codetoReturn;
    };

    public func makeEncoded(background : Text, pot : Text, stem : Text, petal : Text) : Blob {
        let codetoReturn : Text = "<svg id='generated' style='width: 1280px;height: 1280px;' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 1280 1280' xml:space='preserve'><g><image href='data:image/png;base64,"#background#"'></image></g><g><image href='data:image/png;base64,"#pot#"'></image></g><g><image href='data:image/png;base64,"#stem#"'></image></g><g><image href='data:image/png;base64,"#petal#"'></image></g></svg>";
        let codedText : Blob = Text.encodeUtf8(codetoReturn);
        return codedText;
    };
};