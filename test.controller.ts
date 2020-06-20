/*
 * @Author: your name
 * @Date: 2020-06-20 19:23:10
 * @LastEditTime: 2020-06-20 19:25:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \templated:\nestjsExcelDemo\test.controller.ts
 */
import {
  Controller,
  Get,
  Query,
  Inject,
  Post,
  Body,
  Headers,
  Res,
} from '@nestjs/common';
import { Logger } from 'winston';
import { Response } from 'express';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
@Post('excel')
  async createExcel(): Promise<any> {
    return this.testService.createExcel();
  }

  @Get('download')
  async downloadExcel(@Res() res: Response): Promise<any> {
    const filePath = join(__dirname, '../../../public/demo.xlsx');
    if (!existsSync(filePath)) {
      // 以这种方式返回，拦截器拦截不了，这里需要手动格式化返回数据的格式
      res.send({
        code: ErrorCodeEnum.NOT_FOUND,
        message: '文件不存在',
        data: null,
      });
      return;
    }
    res.type('application/vnd.openxmlformats');
    res.attachment('demo.xlsx');
    res.send(readFileSync(filePath));
  }