import {Food} from './Food';

export class Orders {
  constructor(
    public id: number = null,
    public name: string = '',
    public date: string = '',
    public surname: string = '',
    public address: string = '',
    public  bonus: any = 0.0,
    public phoneNumber: string = '',
    public foods: Food[] = [],
  ) {
  }
}
