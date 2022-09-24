import { ApiProperty } from '@nestjs/swagger';
import { AcademicsInformationsModel } from './academicsInformation.model';
import { LanguagesInformationModel } from './languagesInformation.model';
import { PersonalDataModel } from './personalData.model';
import { PreviousJobsModel } from './previousJobs.model';

export class CvModel {
  @ApiProperty()
  candidateID: number;

  @ApiProperty()
  personalData: PersonalDataModel;

  @ApiProperty()
  academicsInfo: AcademicsInformationsModel[] | void[];

  @ApiProperty()
  languagesInfo: LanguagesInformationModel[] | void[];

  @ApiProperty()
  previousJobsInfo: PreviousJobsModel[] | void[];
}
