import { IBooking } from '../interfaces/ibooking';
import { get, set } from 'lodash';

export class Booking implements IBooking {

    constructor(data) {
        set(this, 'data', data);
    }

    get name() {
        return get(this, 'data.name');
    }

    get date() {
        return get(this, 'data.date');
    }

    get service() {
        return get(this, 'data.service');
    }

    getData() {
        return get(this, 'data')
    }

}