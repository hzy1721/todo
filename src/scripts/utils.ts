import { db } from '@/stores/db';
import { useHomeStore } from '@/stores/home';
import { from, useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';

export async function updateActiveInfo(obj) {
  const homeStore = useHomeStore();
  const { activeNav } = homeStore;
  if (activeNav.startsWith('tab_')) {
    const id = activeNav.slice(4);
    await db.tabs.where('id').equals(id).modify(obj);
  } else if (activeNav.startsWith('list_')) {
    const name = activeNav.slice(5);
    await db.lists.where('name').equals(name).modify(obj);
  }
}

export function getActiveInfo(activeNav?: string) {
  if (!activeNav) {
    const homeStore = useHomeStore();
    activeNav = homeStore.activeNav;
  }
  if (activeNav.startsWith('tab_')) {
    const id = activeNav.slice(4);
    const tab = useObservable(
      from(
        liveQuery(() => {
          return db.tabs.get(id);
        })
      )
    );
    return tab;
  } else if (activeNav.startsWith('list_')) {
    const name = activeNav.slice(5);
    const list = useObservable(
      from(
        liveQuery(() => {
          return db.lists.get(name);
        })
      )
    );
    return list;
  }
  return undefined;
}

export function getActiveTaskCount(activeNav?: string) {
  if (!activeNav) {
    const homeStore = useHomeStore();
    activeNav = homeStore.activeNav;
  }
  if (activeNav === 'tab_today') {
    const nowDate = new Date();
    const todayStart = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
    const todayEnd = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1);
    return useObservable(
      from(
        liveQuery(() => {
          return db.tasks.filter((task) => {
            return task.todayTime !== null && todayStart <= task.todayTime && task.todayTime < todayEnd && !task.done;
          }).count();
        })
      )
    );
  } else if (activeNav === 'tab_star') {
    return useObservable(
      from(
        liveQuery(() => {
          return db.tasks.filter((task) => {
            return task.star && !task.done;
          }).count();
        })
      )
    );
  } else if (activeNav === 'tab_plan') {
    return useObservable(
      from(
        liveQuery(() => {
          return db.tasks.filter((task) => {
            return (task.dueTime !== null || task.remindTime !== null) && !task.done;
          }).count();
        })
      )
    );
  } else if (activeNav === 'tab_task') {
    return useObservable(
      from(
        liveQuery(() => {
          return db.tasks.filter((task) => {
            return task.list === '' && !task.done;
          }).count();
        })
      )
    );
  } else if (activeNav.startsWith('list_')) {
    const name = activeNav.slice(5);
    return useObservable(
      from(
        liveQuery(() => {
          return db.tasks.filter((task) => {
            return task.list === name && !task.done;
          }).count();
        })
      )
    );
  }
  return undefined;
}

export async function updateTask(obj, id?: number) {
  const homeStore = useHomeStore();
  const { activeSideBar } = homeStore;
  if (!id) {
    if (activeSideBar.startsWith('task_')) {
      id = Number(activeSideBar.slice(5));
    } else {
      return;
    }
  }
  await db.tasks.where('id').equals(id).modify(obj);
}

export async function deleteTask(id?: number) {
  const homeStore = useHomeStore();
  const { activeSideBar } = homeStore;
  if (!id) {
    if (activeSideBar.startsWith('task_')) {
      id = Number(activeSideBar.slice(5));
    } else {
      return;
    }
  }
  await db.tasks.where('id').equals(id).delete();
}

export function dayToChineseWeek(day: number) {
  const weeks = ['日', '一', '二', '三', '四', '五', '六'];
  return `周${weeks[day]}`;
}

export function readableTime(time: Date): string {
  const nowTime = new Date();
  if (time.getFullYear() == nowTime.getFullYear()
    && time.getMonth() == nowTime.getMonth()
    && time.getDate() == nowTime.getDate()) {
    return '今天';
  }
  const yesterdayTime = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() - 1);
  if (time.getFullYear() == yesterdayTime.getFullYear()
    && time.getMonth() == yesterdayTime.getMonth()
    && time.getDate() == yesterdayTime.getDate()) {
    return '昨天';
  }
  const weeks = ['日', '一', '二', '三', '四', '五', '六'];
  return `${time.getMonth() + 1} 月 ${time.getDate()} 日 周${weeks[time.getDay()]}`;
}

export function dueTime(time: Date): string {
  const weeks = ['日', '一', '二', '三', '四', '五', '六'];
  return `${time.getMonth() + 1}月${time.getDate()}日 周${weeks[time.getDay()]}`;
}

export function timeInToday(time?: Date | null): boolean {
  if (!time) {
    return false;
  }
  const nowDate = new Date();
  const todayStart = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
  const todayEnd = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1);
  return todayStart <= time && time < todayEnd;
}

function containsName(lists, name: string): boolean {
  for (const item of lists) {
    if (typeof item === 'string') {
      if (item === name) {
        return true;
      }
    } else {
      for (const list in item.lists) {
        if (list === name) {
          return true;
        }
      }
    }
  }
  return false;
}

export function getCustomListName(originName: string): string {
  if (!originName.length) {
    originName = '任务';
  }
  const lists: Array<string | { name: string, lists: string[] }> = JSON.parse(localStorage.getItem('custom_lists')!);
  let name = originName;
  for (let idx = 1; containsName(lists, name); ++idx) {
    name = `${originName} (${idx})`;
  }
  return name;
}

export async function updateListName(oldName: string, newName: string) {
  const homeStore = useHomeStore();
  const { customLists } = homeStore;
  for (let i = 0; i < customLists.length; ++i) {
    const item = customLists[i];
    if (typeof item === 'string') {
      if (item === oldName) {
        customLists[i] = newName;
        break;
      }
    } else {
      for (let j = 0; j < item.lists.length; ++j) {
        const list = item.lists[j];
        if (list === oldName) {
          customLists[i][j] = newName;
          break;
        }
      }
    }
  }
  localStorage.setItem('custom_lists', JSON.stringify(customLists));
  await db.lists.where('name').equals(oldName).modify({ name: newName });
  await db.tasks.where('list').equals(oldName).modify({ list: newName });
}

export async function deleteCustomList() {
  const homeStore = useHomeStore();
  const { activeNav, customLists } = homeStore;
  const name = activeNav.slice(5);
  for (let i = 0; i < customLists.length; ++i) {
    const item = customLists[i];
    if (typeof item === 'string') {
      if (item === name) {
        customLists.splice(i, 1);
        break;
      }
    } else {
      for (let j = 0; j < item.lists.length; ++j) {
        const list = item.lists[j];
        if (list === name) {
          (customLists[i] as { name: string, lists: string[] }).lists.splice(j, 1);
          break;
        }
      }
    }
  }
  localStorage.setItem('custom_lists', JSON.stringify(customLists));
  await db.lists.where('name').equals(name).delete();
  await db.tasks.where('list').equals(name).delete();
}