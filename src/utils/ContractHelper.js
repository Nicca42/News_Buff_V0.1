/**
 * @param ethers Instance of ethers
 * @notice This function gets the address of the contract for the various networks
 */
const getTokenAddress = async (_network) => {
    console.log(_network)
    switch (_network) {
        case 'Main Ethereum Network (Unsupported)': // Mainnet
            return '';
        case 'Ropsten Ethereum Test Network (Unsupported)': // Ropsten
            return '';
        case 'Rinkeby Ethereum Test Network': // Rinkeby
            return {
                unique: '0xeF92eD9f4C89121D1039dE4E4712cA057e18e646',
                mock: '0x889c0b44320f184030fDF6DE0102C8C7decD17bc'
            };
        case 'Kovan Ethereum Test Network (Unsupported)': // Kovan
            return '';
        case 'Local Test Network': // Local
            return {
                unique: '0x958bB2307a498A61b0AdEAe3c5f9426270979774',
                mock: '0x47f7A8B81f39Cd87E9a51F1a023a91d78404fAF8'
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