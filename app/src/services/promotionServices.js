/**
 * Created by kainguyen on 6/21/17.
 */


import { extendObservable } from 'mobx';
import fetch from 'isomorphic-fetch';
const PORT = 3000; // 3001 for server API todo: make this one configurable

const API_URL = `http://localhost:${PORT}/api`;
class StoreService {
  constructor() {
    extendObservable(this, {
        loading: false // for state tracking
      }
    );
  }

  fetchPromotions = () => {
    return this.doAsync('/promotion/');
  };

  fetchProducts = () => {
    return this.doAsync('/product/')
  };

  fetchPromotionTypes = () => {
    return this.doAsync('/promotion-types/')
  };

  getPromotion = (id) => {
    return this.doAsync(`/promotion/${id}`);
  };

  upsertPromotion = (data) => {
    const method = (data.id) ? 'PUT' : 'POST';
    return this.doAsync(`/promotion/${data.id || ''}`, data, method);
  };

  doAsync = (url, params, method = 'GET') => {
    const body = params ? JSON.stringify(params) : '';

    let options = {
      method: method,
      mode: 'cors',
      headers: {
        "Content-type": "application/json"
      }
    };

    if (method !== 'GET')
      options.body = body;

    return fetch(API_URL + url, options)
      .then((resp) => resp.json())
      .catch((err) => console.error('failed!', err));
  }

}

const storeService = window.storeService = new StoreService();

export default storeService;
