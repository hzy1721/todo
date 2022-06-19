export class TaskList {
  name: string;
  theme: string = 'dark-blue';
  group: string = '';
  sortKey: string = '';
  sortReverse: boolean = false;
  showDone: boolean = true;
  groupKey: string = '';

  constructor(name: string) {
    this.name = name;
  }
}