import { getUserDataPath } from './appPath';
import fileAction from './file';
import path from 'path';
// 读取数据
export function getTaskModel(select?:any) {
  return new Promise((resolve: (values: { [key: string]: any }) => void, reject: (value: Error) => void) => {
    getUserDataPath().then((appPath: string) => {
      const jsonPath = path.join(appPath, '/task.config.json');
      fileAction
        .hasFile(jsonPath)
        .then(async () => {
          const taskModel = await fileAction.read(jsonPath, 'utf-8');
          let data = JSON.parse(taskModel);
          if(select) {
            data = data.filter((item:any)=>{
              if(select.task === '全部' && select.price === '全部') {
                return item
              } else if(select.task === '全部') {
                return item['getMoney'] === select['price']
              } else if(select.price === '全部') {
                return item['status'] === select['task'] 
              } else {
                return item['getMoney'] === select['price'] && item['status'] === select['task']
              }
            })
            resolve(data);
            
          } else {
            resolve(data);
          }
        })
        .catch(() => {
          reject(new Error('appConfig does not exist !'));
        });
    });
  });
}

// 新增数据
export function addTaskModel(addTask:{},callback?:Function) {
    return new Promise((resolve: (values: boolean) => void, reject: (value: Error) => void) => {
      getUserDataPath().then((appPath: string) => {
        const jsonPath = path.join(appPath, '/task.config.json');
        fileAction
          .hasFile(jsonPath)
          .then(async () => {
            const taskModel = await fileAction.read(jsonPath, 'utf-8');   
            const newTaskModel = [addTask,...JSON.parse(taskModel)];
            fileAction.canRead(jsonPath).then(()=>{
                fileAction.write(jsonPath,newTaskModel,'utf-8').then(()=>{
                    callback && callback()
                    resolve(true)
                })
            })
          })
          .catch(() => {
            reject(new Error('appConfig does not exist !'));
          });
      });
    });
  }

  // 删除数据
export function deleteTaskModel(key:string,callback?:Function) {
  return new Promise((resolve: (values: boolean) => void, reject: (value: Error) => void) => {
    getUserDataPath().then((appPath: string) => {
      const jsonPath = path.join(appPath, '/task.config.json');
      fileAction
        .hasFile(jsonPath)
        .then(async () => {
          const taskModel = await fileAction.read(jsonPath, 'utf-8');
          let newTaskModel = JSON.parse(taskModel).filter((item:any)=>{
            return item.key !== key
          })
          fileAction.canRead(jsonPath).then(()=>{
              fileAction.write(jsonPath,newTaskModel,'utf-8').then(()=>{
                  callback && callback()
                  resolve(true)
              })
          })
        })
        .catch(() => {
          reject(new Error('appConfig does not exist !'));
        });
    });
  });
}

  // 修改数据
  export function editTaskModel(key:string,task:{},callback?:Function) {
    return new Promise((resolve: (values: boolean) => void, reject: (value: Error) => void) => {
      getUserDataPath().then((appPath: string) => {
        const jsonPath = path.join(appPath, '/task.config.json');
        fileAction
          .hasFile(jsonPath)
          .then(async () => {
            const taskModel = await fileAction.read(jsonPath, 'utf-8');
            let newTaskModel = JSON.parse(taskModel).map((item:any)=>{
              if(item.key === key) {
                return task
              } else {
                return item
              }
            })
            fileAction.canRead(jsonPath).then(()=>{
                fileAction.write(jsonPath,newTaskModel,'utf-8').then(()=>{
                    callback && callback()
                    resolve(true)
                })
            })
          })
          .catch(() => {
            reject(new Error('appConfig does not exist !'));
          });
      });
    });
  }


