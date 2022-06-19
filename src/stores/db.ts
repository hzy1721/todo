import Dexie, { type Table } from 'dexie';
import type { Task } from '@/models/Task';
import type { TaskList } from '@/models/TaskList';
import type { TaskTab } from '@/models/TaskTab';

export class TodoDatabase extends Dexie {
  tasks!: Table<Task, number>;
  lists!: Table<TaskList, string>;
  tabs!: Table<TaskTab, string>;

  constructor() {
    super('TodoDatabase');
    this.version(1).stores({
      tasks: '++id,name,done,start,steps,createTime,todayTime,remindTime,dueTime,repeatNum,repeatUnit,repeatDays,files,remark,list',
      lists: 'name,theme,group,sortKey,sortReverse,showDone,groupKey',
      tabs: 'id,theme,sortKey,sortReverse,showDone,groupKey'
    });
  }
};

export const db = new TodoDatabase();
