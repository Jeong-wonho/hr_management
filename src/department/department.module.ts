import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departments } from 'src/entities/Departments';
import { Locations } from 'src/entities/Locations';
import { Countries } from 'src/entities/Countries';
import { Regions } from 'src/entities/Regions';

@Module({
  imports: [
    TypeOrmModule.forFeature([Departments, Locations, Countries, Regions]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
