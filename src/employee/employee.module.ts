import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from 'src/entities/Employees';
import { JobHistory } from 'src/entities/JobHistory';
import { Jobs } from 'src/entities/Jobs';

@Module({
  imports: [TypeOrmModule.forFeature([Employees, JobHistory, Jobs])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
