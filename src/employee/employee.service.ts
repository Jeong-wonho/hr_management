import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from 'src/entities/Employees';
import { Repository } from 'typeorm';
import { updateEmployeeDto } from './dto/upateDto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employees)
    private readonly employeesRepository: Repository<Employees>,
  ) {}

  async getEmployees(): Promise<Employees[]> {
    try {
      const employees = await this.employeesRepository.find();

      if (employees.length === 0) {
        throw new NotFoundException({ message: 'employees is empty' });
      }
      return employees;
    } catch (error) {
      throw new BadRequestException({ message: '잘못된 요청입니다.' });
    }
  }

  //특정 사원의 현재 정보 조회 method
  async getEmployee(employee_id): Promise<Employees> {
    try {
      const employee = this.employeesRepository.findOne({
        where: { employeeId: employee_id },
      });
      if (!employee) {
        throw new NotFoundException(
          `Employee with ID ${employee_id} not found. `,
        );
      }
      return employee;
    } catch (error) {
      throw new BadRequestException({
        message: '잘못된 요청입니다.',
      });
    }
  }

  //특정 사원의 이력 정보 조회 method , 추가적으로 이력 정보가 나올 수 있게 고쳐야 할까?
  async findHistoryOfEmployee(employeeId): Promise<Employees> {
    try {
      const employee = this.employeesRepository.findOne({
        where: { employeeId: employeeId },
        relations: {
          jobHistories: true,
        },
      });
      if (!employee) {
        throw new NotFoundException(
          `Employee with ID ${employeeId} not found. `,
        );
      }
      return employee;
    } catch (error) {
      throw new BadRequestException({
        message: '잘못된 요청입니다.',
      });
    }
  }
  //특정사원을 업데이트 하는 서비스
  //에러처리
  async updateEmployee(id: number, updateData: updateEmployeeDto) {
    try {
      const employeeData = await this.getEmployee(id);
      if (!employeeData) {
        throw new NotFoundException('해당하는 부서를 찾을 수 없습니다.');
      }
      const data = { ...employeeData, ...updateData };

      const updateEmployeeData = await this.employeesRepository.save(data);
      return { message: 'success', data: updateEmployeeData };
    } catch (error) {
      throw new BadRequestException({
        message: '잘못된 요청입니다.',
      });
    }
  }

  //특정 부서의 급여를 특정 비율로 인상 및 사원 정보 업데이트 할 수 있는 API 구현. job의 max, min보다 인상률, 인하률 적용한 급여가 높을시 최저, 최소를 맞춘다.
  //고민 인수가 두개만 필요하고 두개 이상의 인수가 필요하지 않은게 문제야.! updateEmployeeDto가 정상 작동하는지부터 확인필요.! 그리고 정상 작동 확인시 이 주석 삭제 필!
  //에러처리
  async updateSalaryByDepartment(updateData: updateEmployeeDto) {
    try {
      const employeeByDepartment = await this.getEmployeesByDepartmentId(
        +updateData.departmentId,
      );
      //부서별 일괄 update 수정하는 함수
      employeeByDepartment.forEach((e) => {
        const salary = parseFloat(e.salary);
        //update할 commisionPct 값으로 계산한다.
        const commissionPct = parseFloat(updateData.commissionPct);
        const caculatedSalary = salary + salary * commissionPct;
        const jobMaxSalary = parseInt(e.job.maxSalary);
        const jobMinSalary = parseInt(e.job.minSalary);
        // 급여가 생각보다 높을 경우에 어떻게 처리할 지에 대한 고민이 있었습니다.
        if (caculatedSalary > jobMaxSalary) {
          e.salary = jobMaxSalary.toString();
        } else if (caculatedSalary < jobMinSalary) {
          e.salary = jobMinSalary.toString();
        } else {
          e.salary = caculatedSalary.toString();
        }
        e.commissionPct = commissionPct.toString();
        this.employeesRepository.save(e);
      });
      return { message: 'success', data: employeeByDepartment };
    } catch (error) {
      throw new BadRequestException('잘못된 요청입니다.');
    }
  }

  async getEmployeesByDepartmentId(departmentId: number) {
    const employees = this.employeesRepository
      .createQueryBuilder('e')
      .innerJoinAndSelect('e.job', 'j')
      .where('e.departmentId= :departmentId', { departmentId })
      .getMany();

    return employees;
  }
}
