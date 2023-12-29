import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from 'src/entities/Employees';
import { Departments } from 'src/entities/Departments';
import { Locations } from 'src/entities/Locations';
import { Countries } from 'src/entities/Countries';
import { Regions } from 'src/entities/Regions';
import { JobHistory } from 'src/entities/JobHistory';
import { Jobs } from 'src/entities/Jobs';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employees,
      Departments,
      Locations,
      Countries,
      Regions,
      Jobs,
      JobHistory,
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
