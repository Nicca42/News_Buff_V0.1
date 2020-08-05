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
            return '0x79B9142D4Ad457a051Bd42136ad676f647cEF301';
        default:
            console.error("Invalid network");
            return '';
    };
};

const getContractInstance = async (_provider, _ethers, _signer, _abi) => {
    let address = getTokenAddress(_provider);

    return new _ethers.Contract(
        address,
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
    addContent
};