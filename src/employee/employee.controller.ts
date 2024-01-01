import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employees } from 'src/entities/Employees';
import { updateEmployeeDto } from './dto/upateDto';

@Controller('employee')
export class EmployeeController {
  constructor(readonly employeeService: EmployeeService) {}

  @Get()
  async findAll(): Promise<Employees[]> {
    return this.employeeService.getEmployees();
  }

  //특정 사원의 현재 정보 조회 api
  @Get('/:id')
  async findOne(@Param('id') employee_id: number): Promise<Employees> {
    return this.employeeService.getEmployee(employee_id);
  }

  // 특정 사원의 이력 정보 조회 api
  @Get('/jobHistory/:id')
  async findJobHistory(@Param('id') employeeId: number): Promise<Employees> {
    return this.employeeService.findHistoryOfEmployee(employeeId);
  }

  @Post('/salaryUpdate')
  async update(@Body() updateData: updateEmployeeDto) {
    return this.employeeService.updateSalaryByDepartment(updateData);
  }

  @Patch('/:id')
  async updateEmployee(
    @Param('id') employeeId: number,
    @Body() updateData: updateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(employeeId, updateData);
  }
}
