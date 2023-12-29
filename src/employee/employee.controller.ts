import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employees } from 'src/entities/Employees';

@Controller('employee')
export class EmployeeController {
  constructor(readonly employeeService: EmployeeService) {}

  @Get()
  async findAll(): Promise<Employees[]> {
    return this.employeeService.findAll();
  }

  //특정 사원의 현재 정보 조회 api
  @Get('/:id')
  async findOne(@Param('id') employee_id: number): Promise<Employees> {
    return this.employeeService.findOne(employee_id);
  }

  // 특정 사원의 이력 정보 조회 api
  @Get('/jobHistory/:id')
  async findJobHistory(@Param('id') employeeId: number): Promise<Employees> {
    return this.employeeService.findHistoryOfEmployee(employeeId);
  }
}
