import {AES, enc} from "crypto-ts";
import Lightwallet from "eth-lightwallet";
import Web3 from "web3";

export default function Get_data(){
    const password = AES.decrypt(localStorage.getItem("key"),"test").toString(enc.Utf8).slice(
        AES.decrypt(localStorage.getItem("key"),"test").toString(enc.Utf8).indexOf("|")+1,
        AES.decrypt(localStorage.getItem("key"),"test").toString(enc.Utf8).length
    );
    const phrase = AES.decrypt(localStorage.getItem("key"),"test").toString(enc.Utf8).slice(
        0,
        AES.decrypt(localStorage.getItem("key"),"test").toString(enc.Utf8).indexOf("|")
    );
    Lightwallet.keystore.createVault({
        password: password,
        seedPhrase: phrase,
        hdPathString: "m/0'/0'/0'"
    }, (error, ks) => {
        if (error) {
            console.log(error)
        } else
            ks.keyFromPassword(password, async (err1, pwDerivedKey) => {
                if (err1) {
                    alert(err1)
                } else {
                    ks.generateNewAddress(pwDerivedKey, 1);
                    const adresses = ks.getAddresses();
                    const address = adresses[0];
                    const private_key = ks.exportPrivateKey(address, pwDerivedKey);
                    const web3 = new Web3("https://eth-goerli.alchemyapi.io/v2/72Yad39rb8gE0A-owPj2t7VpOOb1BXSa");
                    const balance = await web3.eth.getBalance(address);
                    let ethBalance = web3.utils.fromWei(balance, 'ether');
                    localStorage.setItem("address",address);
                    localStorage.setItem("balance",Number(ethBalance).toFixed(4));
                    localStorage.setItem("private_key",private_key);
                }
            })
    })
 }