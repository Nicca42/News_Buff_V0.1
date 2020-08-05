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
                unique: '0xE456065B0290F6606deb30ec9D49C9c2ecDCde90',
                mock: '0x8D0671D72fa3345839fdC54F815F19FDDcB6617a'
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
    return(userTokenTx);
};

/**
 * @notice Allows a user to freely mint the mock tokens
 * @param ethers An instance of ethers
 * @param _mockTokenInstance The instance of the mock token
 * @param _userAddress The address of the user
 * @param _amount The amount of tokens getting minted to the user
 */
const mintUserToken = async (ethers, _mockTokenInstance, _userAddress, _amount) => {
    let userTokenTx = await _mockTokenInstance.mint(
        _userAddress,
        ethers.utils.parseUnits(_amount.toString(), 18),
    );
    return(userTokenTx);
};

/**
 * @notice Allows a user to tip a creator
 * @param ethers An instance of ethers
 * @param _mockTokenInstance The instance of the mock token
 * @param _creatorAddress The address of the creator 
 * @param _amount The amount of tokens to be sent to the creator
 */
const tipCreator = async (ethers, _mockTokenInstance, _creatorAddress, _amount) => {
    let userTokenTx = await _mockTokenInstance.transfer(
        _creatorAddress,
        ethers.utils.parseUnits(_amount.toString(), 18),
    );
    console.log("> Successfully tipped creator");
    
    return(userTokenTx);
};

/**
 * @notice Adds the id of the content to the users unique token
 * @param _uniqueUserTokenInstance The instance of the unique token
 * @param _contentId The id of the content
 */
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
    tipCreator,
    addContent
};