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
    description: '0 = PJ, 1 = CLT, 2 = PJ OU CLT, 3 = OUTROS',
  })
  contractType: ContractTypes;

  @ApiProperty()
  cityAndState: string;

  @ApiProperty()
  about: string;

  @ApiProperty({
    description: '0 = Estágio, 1 = JR, 2 = PL, 3 = SR',
  })
  level: LevelType;

  @ApiProperty({
    description:
      '0 = Mulher Cis, 1= Mulher Trans, 2= Pessoas Trans, 3 = Mulher Cis e Pessoas Trans',
  })
  gender?: GenderTypes;

  @ApiProperty({
    description: '0 = Negra, 1 = Indigena, 2 = Amarela',
  })
  ethnicity?: EthnicityTypes;

  @ApiProperty()
  pcd: boolean;

  @ApiProperty()
  acceptsAllLevels: boolean;

  @ApiProperty()
  requirements?: JobRequirementsModel[];

  @ApiProperty()
  benefits?: JobBenefitsModel[];

  @ApiProperty()
  softSkills?: SoftSkillsModel[];

  @ApiProperty()
  hardSkills?: HardSkillsModel[];
}
