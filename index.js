import GetUsers from "./scenarios/Get-Users.js";
import { group, sleep } from "k6";

export default () => {
    group('Endpoint GetUsers', () =>{
        GetUsers();
    })
    sleep(1);
}