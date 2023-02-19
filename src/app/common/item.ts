export class Item {

  constructor(public id: number,
              public title: string,
              public description: string,
              public dateCreated: Date,
              public dateDue: Date,
              public dateCompleted: Date
              ) {
  }
}
