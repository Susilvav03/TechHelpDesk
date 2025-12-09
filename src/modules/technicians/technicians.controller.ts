import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { TechniciansService } from './technicians.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';

@ApiTags('Technicians')
@ApiBearerAuth()
@Roles('ADMIN') // Only admin manages technicians
@Controller('technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new technician' })
  create(@Body() dto: CreateTechnicianDto) {
    return this.techniciansService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all technicians' })
  findAll() {
    return this.techniciansService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a technician by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the technician' })
  findOne(@Param('id') id: string) {
    return this.techniciansService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a technician by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the technician' })
  update(@Param('id') id: string, @Body() dto: UpdateTechnicianDto) {
    return this.techniciansService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a technician by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the technician' })
  remove(@Param('id') id: string) {
    return this.techniciansService.remove(id);
  }
}
