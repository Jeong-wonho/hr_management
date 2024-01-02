import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './department/department.module';
import { CustomApiModule } from './custom-api/custom-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    EmployeeModule,
    DepartmentModule,
    CustomApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
