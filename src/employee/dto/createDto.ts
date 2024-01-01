import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';

export class createEmployeeDto {
  @IsNumber()
  readonly employeeId: number;
  @IsOptional()
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsString()
  readonly email: string;
  @IsOptional()
  @IsString()
  readonly phoneNumber: string | null;
  @IsString()
  readonly hireDate: string;
  @IsString()
  readonly jobId: string;
  @IsDecimal()
  readonly salary: string;
  @IsOptional()
  @IsDecimal()
  readonly commissionPct: string | null;
  @IsOptional()
  @IsString()
  readonly managerId: number | null;
  @IsOptional()
  @IsString()
  readonly departmentId: number | null;
}
