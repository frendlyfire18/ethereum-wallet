import axios from "axios";
import {API_URL} from "../constants/constants";

export function UpdateData(setData: any) {
    axios.get(API_URL + "/coins/ethereum").then(function (response) {
        // handle success
        setData(response);
    }).catch(reason => {
        console.log(reason)
    })
}