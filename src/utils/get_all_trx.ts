import axios from "axios";
import {API_URL} from "../constants/constants";


export function get_all_trx(address:string,page:number,setData: any) {
    axios.get(`https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=10&sort=asc&apikey=1315X2KJRYJKE5N4P91FIJH7NDV38XRJMK`).then(function (response) {
        // handle success
        setData(response);
    }).catch(reason => {
        console.log(reason)
    })
}