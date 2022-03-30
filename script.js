import GetCustomer from "./src/scenarios/customer/getCustomerScenario.js"
import GetCustomer2 from "./src/scenarios/customer/getCustomerScenario2.js"
import { group, sleep } from 'k6'

// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for

export const options = {
  stages: [
    { target: 20, duration: '5s' },
    { target: 40, duration: '10s' },
    { target: 10, duration: '5s' },
  ],
  thresholds: {
    requests: ['count > 100'],
  }
};

export default () => {
  group('Endpoint get Customer - Controller - CleanArchitecture.API', () => {
    GetCustomer();
  });
  group('Endpoint get Customer2 - Controller - CleanArchitecture.API', () => {
    GetCustomer2();
  });
  sleep(1)
}