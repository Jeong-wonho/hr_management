import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Departments } from 'src/entities/Departments';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Departments)
    private readonly departmentsRepository: Repository<Departments>,
  ) {}

  // 부서 및 위치 정보 조회 가능한 api 구현
  async findAll(): Promise<Departments[]> {
    try {
      const department = await this.departmentsRepository.find({
        relations: {
          location: true,
        },
      });
      if (department.length === 0) {
        throw new NotFoundException(`부서 부분이 존재하지 않습니다.`);
      }
      return department;
    } catch (error) {
      throw new BadRequestException({ message: '잘못된 요청입니다.' });
    }
  }

  // 특정 부서 및 위치 정보 조회 가능한 api
  async findOne(locationId): Promise<Departments> {
    try {
      const employee = await this.departmentsRepository.findOne({
        where: { locationId: locationId },
        relations: {
          location: true,
        },
      });
      if (!employee) {
        throw new NotFoundException(
          `해당 위치정보(${locationId})에 해당하는 직원을 찾을 수 없습니다. `,
        );
      }
      return employee;
    } catch (error) {
      throw new BadRequestException({ message: '잘못된 요청입니다.' });
    }
  }
}
