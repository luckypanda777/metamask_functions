import Web3 from 'web3'
import { minABI } from './abi'

export const getNativeBalance = async ( rpcUrl, account ) => {
    const web3 = new Web3(rpcUrl[0])
    try {
        const native = await web3.eth.getBalance(account)
        const res = web3.utils.fromWei(native)
        return res
    } catch (err) {
        console.log(err)
        return -1
    }
}

export const getTokenBalance = async ( rpcUrl, account, tokenAddress, tokenDeci ) => {
    const web3 = new Web3(rpcUrl[0])
    try {
        const contract = new web3.eth.Contract(minABI, tokenAddress)
        const token = await contract.methods.balanceOf(account).call()
        // const res = web3.utils.fromWei(token)
        const res = token / (10 ** tokenDeci)
        return res
    } catch (err) {
        console.log(err)
        return -1
    }
}