/**
 * @param ethers Instance of ethers
 * @notice This function gets the address of the contract for the various networks
 */
const getTokenAddress = async (_ethers) => {
    let network = await _ethers.getNetwork();

    switch (network.chainId) {
        case 1: // Mainnet
            return '';
        case 3: // Ropsten
            return '';
        case 4: // Rinkeby
            return '';
        case 42: // Kovan
            return '';
        case 1337: // Local
            return {
                unique: '0x958bB2307a498A61b0AdEAe3c5f9426270979774',
                mock: '0xD6cE650b08C60c317c930dEEb6B4F830F289E66c'
            };
        default:
            console.error("Invalid network");
            return '';
    };
};

const getContractInstance = async (_address, _ethers, _signer, _abi) => {
    return new _ethers.Contract(
        _address,
        _abi,
        _signer 
      );
};

const getUserToken = async (_uniqueUserTokenInstance, _userAddress) => {
    let userTokenInfo = await _uniqueUserTokenInstance.getUserTokenInfo(_userAddress);

    return({
        userName: userTokenInfo[0],
        threadId: userTokenInfo[1],
        created: userTokenInfo[2],
        contentIds: userTokenInfo[3]
    });
};

const createUserToken = async (_uniqueUserTokenInstance, _userName, _userThreadId) => {
    let userTokenTx = await _uniqueUserTokenInstance.mint(
        _userName,
        _userThreadId
    );

    // let result = await _uniqueUserTokenInstance.verboseWaitForTransaction(
    //     userTokenTx,
    //     "Creating user token..."
    // );

    return(userTokenTx);
};

const mintUserToken = async (ethers, _mockTokenInstance, _userAddress, _amount) => {
    let userTokenTx = await _mockTokenInstance.mint(
        _userAddress,
        ethers.utils.parseUnits(_amount.toString(), 18),
    );
    return(userTokenTx);
};

const addContent = async (_uniqueUserTokenInstance, _contentId) => {
    await _uniqueUserTokenInstance.createContent(
        _contentId
    );

    console.log("> Successfully added post to token");
};

module.exports = {
    getTokenAddress,
    getContractInstance,
    getUserToken,
    createUserToken,
    mintUserToken,
    addContent
};