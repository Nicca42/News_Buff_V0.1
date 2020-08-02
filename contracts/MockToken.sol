pragma solidity >=0.6.6 <0.6.12;
 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {

    constructor() ERC20("MockToken", "MT") public {

    }

    function mint(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }
}