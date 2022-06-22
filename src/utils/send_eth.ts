import {FormikHelpers} from "formik";
import Lightwallet from "eth-lightwallet";
import Web3 from "web3";
import HookedWeb3Provider from "hooked-web3-provider";
import {AES, enc} from "crypto-ts";

export function send_eth(values: { privateKey: string, password: string, twelveWords: string,from:string, to:string, ether:string }, actions: FormikHelpers<{ privateKey: string, password: string, twelveWords: string,from:string, to:string, ether:string }>) {
    Lightwallet.keystore.createVault({
        password: values.password,
        seedPhrase: values.twelveWords,
        hdPathString: "m/0'/0'/0'"
    }, (error, ks) => {
        if (error) {
            console.log(error)
        } else
            ks.keyFromPassword(values.password, async (err1, pwDerivedKey) => {
                if (err1) {
                    actions.setErrors({twelveWords:err1.message})
                } else {
                    const provider = new HookedWeb3Provider({
                        host: "https://eth-goerli.alchemyapi.io/v2/72Yad39rb8gE0A-owPj2t7VpOOb1BXSa",
                        transaction_signer: ks
                    });
                    const web3 = new Web3(provider);
                    const value = web3.utils.toWei(values.ether);

                    const nonce = await web3.eth.getTransactionCount(values.from, 'latest');
                    const valid_address = web3.utils.toChecksumAddress(values.to);
                    const transaction = {
                        'to': valid_address, // faucet address to return eth
                        'value': value,
                        'gas': 30000,
                        'maxPriorityFeePerGas': 1000000108,
                        'nonce': nonce,
                        // optional data field to send message or execute smart contract
                    };

                    const signedTx = await web3.eth.accounts.signTransaction(transaction, values.privateKey);

                    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
                        if (!error) {
                            alert(`🎉 The hash of your transaction is:  ${hash} \n Check Alchemy's Mempool to view the status of your transaction!`);
                        } else {
                            alert(`❗Something went wrong while submitting your transaction: ${error}`)
                        }
                    });
                }
            });
    })
}