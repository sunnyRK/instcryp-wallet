pragma solidity ^0.5.0;

import "./IERC20.sol";

contract walletFactory {
    
    mapping(address => address) public ownerToWalletMapping;
    mapping(address => address) public walletToOwnerMapping;
    mapping(address => bool) public isOwnerHasWallet;
    address[] walletAddresses;
    
    modifier isOwnerHasALreadyWallet {
        require(!isOwnerHasWallet[msg.sender]);
        _;
    }
    
    function createWallet() public isOwnerHasALreadyWallet returns(address){
        wallet wal = new wallet(msg.sender);
        ownerToWalletMapping[msg.sender] = address(this);
        walletToOwnerMapping[address(this)] = msg.sender;
        isOwnerHasWallet[msg.sender] = true;
        walletAddresses.push(address(wal));
        return address(wal);
    }
    
    function getWalletAddresses() public view returns(address[] memory) {
        return walletAddresses;
    }
    
    function getWalletAddressbyOwner(address _ownerAddress) public view returns(address) {
        return ownerToWalletMapping[_ownerAddress];
    }
    
    function getOwnerAddressByWallet(address _walletAddress) public view returns(address) {
        return walletToOwnerMapping[_walletAddress];
    }
    
}

contract wallet {
    
    IERC20 public ERC20Interface;
    struct Transfer {
        address contract_;
        address to_;
        uint amount_;
        bool failed_;
    }

    mapping(address => uint[]) public transactionIndexesToSender;
    Transfer[] public transactions;
    address public owner;
    address public owner2;
    mapping(bytes32 => address) public tokens;

    event TransferSuccessful(address indexed from_, address indexed to_, uint256 amount_);
    event TransferFailed(address indexed from_, address indexed to_, uint256 amount_);

    constructor(address _owner) public {
        owner = _owner;
        owner2 = msg.sender;
    }
    
    modifier onlyOwner {
        require(owner == gets());
        _;
    }
    
    function addNewToken(bytes32 symbol_, address address_) public onlyOwner returns (bool) {
        tokens[symbol_] = address_;
        return true;
    }
    
    function removeToken(bytes32 symbol_) public onlyOwner returns (bool) {
        require(tokens[symbol_] != address(0));
        delete(tokens[symbol_]);
        return true;
    }
    
    function transferTokens(bytes32 symbol_, address to_, uint256 amount_) public {
        require(tokens[symbol_] != address(0));
        require(amount_ > 0);

        address contract_ = tokens[symbol_];
        address from_ = gets();

        ERC20Interface =  IERC20(contract_);

        uint256 transactionId = transactions.push(
            Transfer({
                contract_:  contract_,
                to_: to_,
                amount_: amount_,
                failed_: true
            })
        );

        transactionIndexesToSender[from_].push(transactionId - 1);

        if(amount_ > ERC20Interface.allowance(from_, address(this))) {
            emit TransferFailed(from_, to_, amount_);
            revert();
        }

        ERC20Interface.transferFrom(from_, to_, amount_);
        transactions[transactionId - 1].failed_ = false;
        emit TransferSuccessful(from_, to_, amount_);
    }
    
    function gets() public view returns(address) {
        return msg.sender;
    }
}