import { ContractTypes } from 'src/common/enums/contractType.enum';
import { EthnicityTypes } from 'src/common/enums/ethnicityTypes.enum';
import { GenderTypes } from 'src/common/enums/genderTypes.enum';
import { LevelType } from 'src/common/enums/levelType.enum';
import { HardSkillsModel } from 'src/common/models/hardSkills.model';
import { JobBenefitsModel } from 'src/common/models/jobBenefits.model';
import { JobRequirementsModel } from 'src/common/models/jobRequirements.model';
import { SoftSkillsModel } from 'src/common/models/softSkills.model';

export interface CreateJobVacanciesDTO {
  companyID: number;
  title: string;
  salary: number;
  contractType: ContractTypes;
  cityAndState: string;
  level: LevelType;
  gender?: GenderTypes;
  ethnicity?: EthnicityTypes;
  pcd: boolean;
  acceptsAllLevels: boolean;
  requirements?: JobRequirementsModel[];
  benefits?: JobBenefitsModel[];
  softSkills?: SoftSkillsModel[];
  hardSkills?: HardSkillsModel[];
}
