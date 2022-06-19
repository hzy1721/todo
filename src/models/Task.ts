export interface TaskStep {
  name: string;
  done: boolean;
}

export class Task {
  id?: number;
  name: string;
  done = false;
  star = false;
  steps: TaskStep[] = [];
  createTime = new Date();
  todayTime: Date | null = null;
  remindTime: Date | null = null;
  dueTime: Date | null = null;
  repeatNum = 0;
  repeatUnit = '';
  repeatDays = [];
  files = [];
  remark = '';
  list = '';

  constructor(name: string) {
    this.name = name;
  }
};