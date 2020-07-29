pragma solidity >=0.6.6 <0.6.12;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";

contract UniqueUserTokens is ERC721, ERC721Burnable {
    uint private tokensCreated;

    struct UserInfo {
        string userName;
        string threadId;
        bool created;
    }

    mapping(address => UserInfo) private _userInformation;
    constructor() ERC721("Unique User Tokens", "UUT") public {

    }

    function mint(string memory _userName, string memory _threadId) public {
        require(!_userInformation[msg.sender].created, "User has token");

        _userInformation[msg.sender].userName = _userName;
        _userInformation[msg.sender].threadId = _threadId;
        _userInformation[msg.sender].created = true;
        _mint(msg.sender, tokensCreated);

        tokensCreated.add(1);
    }

    function getUserTokenInfo(address _user) public view returns(string memory, string memory, bool) {
        return (
            _userInformation[_user].userName,
            _userInformation[_user].threadId,
            _userInformation[_user].created
        );
    }
}