import http from "k6/http";
import { sleep } from "k6";
import { Trend, Rate } from "k6/metrics";
import { check, fail } from "k6";

export let GetUsersDuration = new Trend('get_users_duration');
export let GetUsersFailRate = new Rate('get_users_fail_rate');
export let GetUsersSuccessRate = new Rate('get_users_success_rate');
export let GetUsersReqs = new Trend('get_users_reqs');

export default function () {  
    let res = http.get('https://reqres.in/api/users?page=2')

    GetUsersDuration.add(res.timings.duration);
    GetUsersReqs.add(1);
    GetUsersFailRate.add(res.status == 0 || res.status > 399);
    GetUsersSuccessRate.add(res.status < 399);

    let durationMsg = 'Max Duration ${4000/1000}s'
    if(!check(res,{
        'max duration': (r) => r.timings.duration < 4000,
        'is status 200': (r) => r.status === 200,
    })){
        fail(durationMsg);
    }

    sleep(1);
    
}