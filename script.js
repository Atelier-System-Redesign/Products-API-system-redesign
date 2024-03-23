import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

  stages: [
    { duration: '10s', target: 100 },
    { duration: '15s', target: 100 },
    { duration: '5s', target: 0 },
  ],
};

const endPoints = {
  getProducts: (page = 1, count = 5) => `?page=${page}&count=${count}`,
  getProduct: '999999',
  getStyles: '999999/styles',
  getRelated: '999999/Related',
  slowGetProduct: 'slow',
};

export default function () {
  http.get(`http://localhost:3000/products/${endPoints.getProduct}`);
  sleep(1);
}
