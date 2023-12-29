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

  @Get('/:id')
  async findOne(@Param('id') employee_id: number): Promise<Employees> {
    return this.employeeService.findOne(employee_id);
  }
}
