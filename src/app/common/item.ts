export class Item {

  constructor(public id: number,
              public name: string,
              public description: string,
              public completed: boolean,
              public dateCreated: Date,
              public dateDue: Date,
              public dateCompleted: Date
              ) {
  }
}
