import {Food} from './Food';

export class Orders {
  constructor(
    public id: number = null,
    public name: string = '',
    public date: Date,
    public surname: string = '',
    public address: string = '',
    public  bonus: any = 0.0,
    public phoneNumber: string = '',
    public sum = 0.0,
    public foods: Food[] = [],
  ) {
  }
}
