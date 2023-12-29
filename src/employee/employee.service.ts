import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from 'src/entities/Employees';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employees)
    private readonly employeesRepository: Repository<Employees>,
  ) {}

  async findAll(): Promise<Employees[]> {
    return this.employeesRepository.find();
  }

  //특정 사원의 현재 정보 조회 method
  async findOne(employee_id): Promise<Employees> {
    const employee = this.employeesRepository.findOne({
      where: { employeeId: employee_id },
    });
    if (!employee) {
      throw new NotFoundException(`Movie with ID ${employee_id} not found. `);
    }
    return employee;
  }

  //특정 사원의 이력 정보 조회 method , 추가적으로 이력 정보가 나올 수 있게 고쳐야 할까?
  async findHistoryOfEmployee(employeeId): Promise<Employees> {
    const employeePromise = this.employeesRepository.findOne({
      where: { employeeId: employeeId },
      relations: {
        jobHistories: true,
      },
    });
    console.log('employeePromise:', employeePromise);
    return employeePromise;
  }
}
