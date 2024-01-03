import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employees } from 'src/entities/Employees';
import { updateEmployeeDto } from './dto/upateDto';

@Controller('employee')
export class EmployeeController {
  constructor(readonly employeeService: EmployeeService) {}

  //   @Get()
  //   async findAll(): Promise<Employees[]> {
  //     return this.employeeService.getEmployees();
  //   }

  /**
   * 특정 사원의 현재 정보 조회 api
   * @param employee_id 특정사원의 id로 조회합니다.
   * @returns Employees
   */
  @Get('/:id')
  async findOne(@Param('id') employeeId: number): Promise<Employees> {
    return this.employeeService.getEmployee(employeeId);
  }

  /**
   * 특정 사원의 이력 정보 조회 api
   * @param employeeId 특정사원의 id로 조회합니다.
   * @returns Employees
   */
  @Get('/jobHistory/:id')
  async findJobHistory(@Param('id') employeeId: number): Promise<Employees> {
    return this.employeeService.findHistoryOfEmployee(employeeId);
  }

  /**
   * 특정 부서의 연봉 일괄 변경하는 method
   * @param updateData {departmentId:110, commissionPct:0.25}
   * @returns employees
   */
  @Post('/salaryUpdate')
  async updateSalary(@Body() updateData: updateEmployeeDto) {
    return this.employeeService.updateSalaryByDepartment(updateData);
  }

  /**
   * 특정사원의 정보 업데이트
   * @param employeeId 해당 사원의 id
   * @param updateData 해당 사원의 updateData
   * @returns employees
   */
  @Post('/:id')
  async updateEmployee(
    @Param('id') employeeId: number,
    @Body() updateData: updateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(employeeId, updateData);
  }
}
