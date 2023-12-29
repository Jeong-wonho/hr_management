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

  async findOne(employee_id): Promise<Employees> {
    console.log('typeof:', typeof employee_id);
    const employee = this.employeesRepository.findOne({
      where: { employeeId: employee_id },
    });
    if (!employee) {
      throw new NotFoundException(`Movie with ID ${employee_id} not found. `);
    }
    return employee;
  }
}
