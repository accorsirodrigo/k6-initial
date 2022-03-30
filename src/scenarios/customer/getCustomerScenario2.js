import http from 'k6/http';
import { sleep, check, fail } from 'k6';
import { Trend, Counter, Rate} from 'k6/metrics';

// A simple counter for http requests

export const requests = new Counter('http_reqs');
export let GetCustomerDuration = new Trend('get_customer_duration');
export let GetSuccessRate = new Rate('get_customer_success_rate');
export let GetErrorRate = new Rate('get_customer_fail_rate');
export let GetCustomerRequests = new Rate('get_customer_requests')

export default function () {
  // our HTTP request, note that we are saving the response to res, which can be accessed later

  let res = http.get('http://test.k6.io');

  GetCustomerDuration.add(res.timings.duration);
  GetErrorRate.add(res.status == 0 || res.status > 399);
  GetSuccessRate.add(res.status < 399);
  GetCustomerRequests.add(1);

  let durationMs = `Max duration ${4000/1000}s`
  
  if(!check(res, {
    'max duration': (r) => r.timings.duration < 4000
  })){
    fail(durationMs)
  }
  
  sleep(1);
}