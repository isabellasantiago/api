import { ApiProperty } from '@nestjs/swagger';
import { AcademicFormationTypes } from '../enums/academicFormation-type.enum';
import { AcademicStatusType } from '../enums/academicStatus-type.enum';

export class AcademicsInformationsModel {
  @ApiProperty({
    description: 'Identificador da informação academica',
  })
  id: number;

  @ApiProperty({
    description:
      'identificador do candidato que possui essa informação academica',
  })
  candidateID: number;

  @ApiProperty({
    description: 'Nome da instituição academica',
  })
  instituitionName: string;

  @ApiProperty({
    description: 'Nome do curso',
  })
  courseName: string;

  @ApiProperty({
    description:
      'Tipo da formação academica: 1- Ensino médio/regular, 2- Técnologo, 3- Ensino Superior, 4- Pós graduação, 5- Mestrado, 6- Doutorado',
  })
  academicFormation: AcademicFormationTypes;

  @ApiProperty({
    description: 'Status da formação: 1 - Cursando, 2 - Concluído, 3- Trancado',
  })
  academicFormationStatus: AcademicStatusType;

  @ApiProperty({
    description: 'inicio da graduação',
  })
  graduationStartDate: Date;

  @ApiProperty({
    description: 'fim da graduação',
  })
  graduationEndDate?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
