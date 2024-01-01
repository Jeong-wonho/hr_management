import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Departments } from 'src/entities/Departments';

@Controller('department')
export class DepartmentController {
  constructor(readonly departmentService: DepartmentService) {}

  //부서 및 위치 정보 조회 가능한 api
  @Get()
  async findAll(): Promise<Departments[]> {
    return this.departmentService.findAll();
  }

  //특정 부서 별 위치 정보 조회 가능 api
  @Get('/:id')
  async findOne(@Param('id') locationId: number): Promise<Departments> {
    return this.departmentService.findOne(locationId);
  }
}
