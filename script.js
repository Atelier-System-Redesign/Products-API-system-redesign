import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

  stages: [
    { duration: '10s', target: 100 },
    { duration: '15s', target: 100 },
    { duration: '5s', target: 0 },
  ],
};

export default function () {
  http.get('http://localhost:3000/products/999999');
  sleep(1);
}
