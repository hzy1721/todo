export class TaskTab {
  id: string;
  theme: string;
  sortKey: string = '';
  sortReverse: boolean = false;
  showDone: boolean = true;
  groupKey: string = '';

  constructor(id: string, theme: string) {
    this.id = id;
    this.theme = theme;
  }
}