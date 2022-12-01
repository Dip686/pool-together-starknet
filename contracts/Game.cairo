// SPDX-License-Identifier: MIT

%lang starknet

// from openzeppelin.token.erc20.library import ERC20

// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts for Cairo v0.5.1 (token/erc20/IERC20.cairo)

from starkware.cairo.common.uint256 import Uint256
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.syscalls import get_contract_address

@contract_interface
namespace IERC20 {
    func name() -> (name: felt) {
    }

    func symbol() -> (symbol: felt) {
    }

    func decimals() -> (decimals: felt) {
    }

    func totalSupply() -> (totalSupply: Uint256) {
    }

    func balanceOf(account: felt) -> (balance: Uint256) {
    }

    func allowance(owner: felt, spender: felt) -> (remaining: Uint256) {
    }

    func transfer(recipient: felt, amount: Uint256) -> (success: felt) {
    }

    func transferFrom(sender: felt, recipient: felt, amount: Uint256) -> (success: felt) {
    }

    func approve(spender: felt, amount: Uint256) -> (success: felt) {
    }
}

@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    token_contract_address: felt
) {
    tokenContractAddress.write(value=token_contract_address);
    return ();
}

// Define a storage variable.
@storage_var
func tokenContractAddress() -> (res: felt) {
}

// function to deposit token to this contract
@external
func deposit{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    amount: Uint256, sender: felt
) -> (success: felt) {
    let (erc20ContractAddress) = tokenContractAddress.read();
    let (recipient_address) = get_contract_address();
    return IERC20.transferFrom(
        contract_address=erc20ContractAddress,
        sender=sender,
        recipient=recipient_address,
        amount=amount,
    );
}
