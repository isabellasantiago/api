import { ContractTypes } from 'src/common/enums/contractType.enum';
import { EthnicityTypes } from 'src/common/enums/ethnicityTypes.enum';
import { GenderTypes } from 'src/common/enums/genderTypes.enum';
import { LevelType } from 'src/common/enums/levelType.enum';
import { JobBenefitsModel } from 'src/common/models/jobBenefits.model';
import { JobRequirementsModel } from 'src/common/models/jobRequirements.model';

export interface CreateJobVacanciesDTO {
  title: string;
  salary: number;
  contractType: ContractTypes;
  cityAndState: string;
  level: LevelType;
  gender: GenderTypes;
  ethnicity: EthnicityTypes;
  pcd: boolean;
  acceptAllLevels: boolean;
  requirements: JobRequirementsModel[];
  benefits: JobBenefitsModel[];
}
