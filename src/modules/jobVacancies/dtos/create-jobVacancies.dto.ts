import { ApiProperty } from '@nestjs/swagger';
import { ContractTypes } from 'src/common/enums/contractType.enum';
import { EthnicityTypes } from 'src/common/enums/ethnicityTypes.enum';
import { GenderTypes } from 'src/common/enums/genderTypes.enum';
import { LevelType } from 'src/common/enums/levelType.enum';
import { HardSkillsModel } from 'src/common/models/hardSkills.model';
import { JobBenefitsModel } from 'src/common/models/jobBenefits.model';
import { JobRequirementsModel } from 'src/common/models/jobRequirements.model';
import { SoftSkillsModel } from 'src/common/models/softSkills.model';

export class CreateJobVacanciesDTO {
  @ApiProperty()
  companyID: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  salary: number;

  @ApiProperty({
    description: '1- PJ, 2- CLT, 3-PJ OU CLT, 4- OUTROS',
  })
  contractType: ContractTypes;

  @ApiProperty()
  cityAndState: string;

  @ApiProperty()
  about: string;

  @ApiProperty({
    description:
      '1 = Estágio, 2 = JR, 3 = PL, 4 = SR, 5 = Analista, 6 = Agente',
  })
  level: LevelType;

  @ApiProperty({
    description:
      '1 = Mulher Cis, 2= Mulher Trans, 3= Pessoas Trans, 4 = Mulher Cis e Pessoas Trans',
  })
  gender?: GenderTypes;

  @ApiProperty({
    description: '1 = Negra, 2 = Indigena, 3 = Amarela',
  })
  ethnicity?: EthnicityTypes;

  @ApiProperty()
  pcd: boolean;

  @ApiProperty()
  acceptsAllLevels: boolean;

  @ApiProperty()
  requirements?: Array<string>;

  @ApiProperty()
  benefits?: Array<string>;

  @ApiProperty()
  softSkills?: Array<string>;

  @ApiProperty()
  hardSkills?: Array<string>;
}
