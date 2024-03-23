import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

  stages: [
    { duration: '10s', target: 10 },
    { duration: '15s', target: 10 },
    { duration: '5s', target: 0 },
  ],
};

const endPoints = {
  products: (page = 1, count = 5) => `?page=${page}&count=${count}`,
  product: '999999',
  styles: '999999/styles',
  related: '999999/Related',
  slow: 'slow',
};

export default function () {
  http.get(`http://localhost:3000/products/${endPoints.slow}`);
  sleep(1);
}
