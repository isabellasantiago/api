import { AcademicsInformationsModel } from 'src/common/models/academicsInformation.model';
import { HardSkillsByCandidateModel } from 'src/common/models/hardSkillsByCandidate.model';
import { LanguagesInformationModel } from 'src/common/models/languagesInformation.model';
import { PersonalDataModel } from 'src/common/models/personalData.model';
import { PreviousJobsModel } from 'src/common/models/previousJobs.model';
import { SoftSkillsByCandidateModel } from 'src/common/models/softSkillsByCandidate.model';

export interface ICv {
  personalData: PersonalDataModel;

  academics: AcademicsInformationsModel[];

  languages: LanguagesInformationModel[];

  previousJobs: PreviousJobsModel[];

  softSkills: SoftSkillsByCandidateModel[];

  hardSkills: HardSkillsByCandidateModel[];
}
