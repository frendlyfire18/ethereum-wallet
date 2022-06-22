import {FormikHelpers} from "formik";
import Lightwallet from "eth-lightwallet";
import Web3 from "web3";

export function generete_adresses(values: { privateKey: string, password: string, twelveWords: string }, actions: FormikHelpers<{ privateKey: string, password: string, twelveWords: string }>) {
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
                    ks.generateNewAddress(pwDerivedKey, 1);
                    const adresses = ks.getAddresses();
                    const web3 = new Web3("https://eth-goerli.alchemyapi.io/v2/72Yad39rb8gE0A-owPj2t7VpOOb1BXSa");
                    for (let count = 0; count < adresses.length; count++) {
                        const address = adresses[count];
                        const private_key = ks.exportPrivateKey(address, pwDerivedKey);
                        values.privateKey = private_key;
                        const balance = await web3.eth.getBalance(address);
                        console.log("Address:", address, "Private key:", private_key, "Balance:", balance)
                    }
                }
            })
    })
}