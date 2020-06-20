import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { fork } from 'child_process';


@Injectable()
export class TestService {
  getHello(): string {
    return 'hello world';
  }

  async createExcel(): Promise<void> {
    
    const params = {
      type: 'export', // 导出还是导入
      rows: this.getRowDatas(), // 要导出的数据
      columns: this.getColumnDatas(), // 列头信息
      sheetName: '导出示例', // 工作簿名称
      filePath: join(__dirname, '../../../public/demo.xlsx'), // 图片存储路径有待进一步规划，示例暂时这么写
    };

    const workerModule = join(__dirname, '../../shared/utils/excel.util.js');

    const options = {
      env: { NODE_ENV: process.env.NODE_ENV },
      // execArgv: ['--inspect-brk=0.0.0.0:9230'], // 需要调试子进程放开这个参数
    };

    const worker = fork(workerModule, [], options);
    worker.send(params);
    worker.on('message', (result: any) => {
      if (result.code === 200) {
        console.log('导出成功');
      } else {
        console.log('导出失败');
      }
    });
  }

  /**
   * 设置 excel 列头信息
   * name 列名
   * type 类型
   * key 对应数据的 key
   * size 大小
   * baseUri 导出图片时，这里是图片的存储路径
   */
  private getColumnDatas() {
    return [
      {
        name: '姓名',
        type: 'String',
        key: 'name',
        size: 20,
      },
      {
        name: '年龄',
        type: 'Number',
        key: 'age',
        size: 20,
      },
      {
        name: '性别',
        type: 'Enum',
        key: 'sex',
        default: { 1: '女', 2: '男' },
        size: 20,
      },
      {
        name: '照片',
        type: 'Image',
        key: 'imagePath',
        size: 14.5,
        baseUri: join(__dirname, '../../../public'),
      },
      {
        name: '时间',
        type: 'Date', // 传的是秒级时间戳
        key: 'time',
        size: 32,
      },
    ];
  }

  /**
   * 获取要导出到 excel 的数据
   */
  private getRowDatas() {
    return [
      {
        name: '张三',
        age: 12,
        sex: 1,
        imagePath: '/image/public/hello.jpg',
        time: 1592387505,
      },
      {
        name: '张三',
        age: 12,
        sex: 1,
        imagePath: '/image/public/hello.jpg',
        time: 1592387505,
      },
      {
        name: '张三',
        age: 12,
        sex: 1,
        imagePath: '/image/public/hello.jpg',
        time: 1592387505,
      },
      {
        name: '张三',
        age: 12,
        sex: 1,
        imagePath: '/image/public/hello.jpg',
        time: 1592387505,
      },
      {
        name: '张三',
        age: 12,
        sex: 1,
        imagePath: '/image/public/hello.jpg',
        time: 1592387505,
      },
      {
        name: '张三',
        age: 12,
        sex: 1,
        imagePath: '/image/public/hello.jpg',
        time: 1592387505,
      },
      {
        name: '张三',
        age: 12,
        sex: 1,
        imagePath: '/image/public/hello.jpg',
        time: 1592387505,
      },
    ];
  }
}
