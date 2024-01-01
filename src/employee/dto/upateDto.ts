import { PartialType } from '@nestjs/mapped-types';
import { createEmployeeDto } from './createDto';

export class updateEmployeeDto extends PartialType(createEmployeeDto) {}
