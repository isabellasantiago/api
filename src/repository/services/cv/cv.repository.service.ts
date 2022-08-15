import { InjectModel } from '@nestjs/sequelize';
import { AcademicsInformationsModel } from 'src/common/models/academicsInformation.model';
import { LanguagesInformationModel } from 'src/common/models/languagesInformation.model';
import { PersonalDataModel } from 'src/common/models/personalData.model';
import { PreviousJobsModel } from 'src/common/models/previousJobs.model';
import {
  AcademicsInformationsEntity,
  CandidateEntity,
  PersonalDataEntity,
  PreviousJobsEntity,
} from 'src/entities';
import { LanguagesInformationEntity } from 'src/entities/languagesInformation.entity';
import { CreateOrUpdateCvDTO } from 'src/modules/cv/dto/create-cv.dto';
import { ICv } from 'src/modules/cv/dto/cv-complete.output';

export class CvRepositoryService {
  constructor(
    @InjectModel(CandidateEntity)
    private readonly candidateEntity: typeof CandidateEntity,
    @InjectModel(PersonalDataEntity)
    private readonly personalDataEntity: typeof PersonalDataEntity,
    @InjectModel(AcademicsInformationsEntity)
    private readonly academicsEntity: typeof AcademicsInformationsEntity,
    @InjectModel(LanguagesInformationEntity)
    private readonly languagesEntity: typeof LanguagesInformationEntity,
    @InjectModel(PreviousJobsEntity)
    private readonly previousJobsEntity: typeof PreviousJobsEntity,
  ) {}

  async createCv({
    candidateID,
    imageURL,
    linkedinURL,
    naturalness,
    birthDate,
    state,
    city,
    phone,
    field,
    contractType,
    level,
    role,
    academics,
    languages,
    previousJobs,
  }: CreateOrUpdateCvDTO): Promise<PersonalDataModel> {
    const transaction = await this.personalDataEntity.sequelize.transaction();

    try {
      const personalData = await this.personalDataEntity.create({
        candidateID,
        imageURL,
        linkedinURL,
        naturalness,
        birthDate,
        state,
        city,
        phone,
        field,
        level,
        role,
        contractType,
      });

      if (academics) {
        await Promise.all(
          academics.map(
            async ({
              instituitionName,
              academicFormation,
              academicFormationStatus,
              courseName,
            }) => {
              await this.academicsEntity.create({
                candidateID,
                instituitionName,
                courseName,
                academicFormation,
                academicFormationStatus,
              });
            },
          ),
        );
      }

      if (languages) {
        await Promise.all(
          languages.map(
            async ({ languageLevel, languageName }) =>
              await this.languagesEntity.create({
                candidateID,
                languageName,
                languageLevel,
              }),
          ),
        );
      }

      if (previousJobs) {
        await Promise.all(
          previousJobs.map(
            async ({
              previousCompanyName,
              role,
              level,
              fromDate,
              toDate,
              jobDescription,
            }) =>
              await this.previousJobsEntity.create({
                candidateID,
                previousCompanyName,
                role,
                level,
                fromDate,
                toDate,
                jobDescription,
              }),
          ),
        );
      }

      return personalData;
    } catch (err) {
      await transaction.rollback();
      console.log(err.message);
    }
  }

  async getPersonalData(candidateID: number): Promise<PersonalDataModel> {
    const candidate = await this.candidateEntity.findByPk(candidateID);

    if (candidate) {
      const pd = await this.personalDataEntity.findOne({
        where: { candidateID: candidate.id },
      });

      if (pd) return pd;
    }

    return null;
  }

  async getAllAcademics(
    candidateID: number,
  ): Promise<AcademicsInformationsModel[]> {
    const candidate = await this.candidateEntity.findByPk(candidateID);

    if (candidate) {
      const academics = await this.academicsEntity.findAll({
        where: { candidateID },
      });

      if (academics) return academics;
    }

    return [];
  }

  async getAllLanguages(
    candidateID: number,
  ): Promise<LanguagesInformationModel[]> {
    const candidate = await this.candidateEntity.findByPk(candidateID);

    if (candidate) {
      const languages = await this.languagesEntity.findAll({
        where: { candidateID },
      });

      if (languages) return languages;
    }

    return [];
  }

  async getAllPreviousJobs(candidateID: number): Promise<PreviousJobsModel[]> {
    const candidate = await this.candidateEntity.findByPk(candidateID);

    if (candidate) {
      const previousJobs = await this.previousJobsEntity.findAll({
        where: { candidateID },
      });

      if (previousJobs) return previousJobs;
    }

    return [];
  }

  async updateCv({
    candidateID,
    imageURL,
    linkedinURL,
    naturalness,
    birthDate,
    state,
    city,
    phone,
    field,
    contractType,
    level,
    role,
    academics,
    languages,
    previousJobs,
  }: CreateOrUpdateCvDTO): Promise<ICv> {
    const personalData = await this.personalDataEntity.findOne({
      where: { candidateID },
    });

    await personalData.update({
      imageURL,
      linkedinURL,
      naturalness,
      birthDate,
      state,
      city,
      phone,
      field,
      contractType,
      level,
      role,
    });

    const academicsArray = await this.getAllAcademics(candidateID);
    await Promise.all(
      academicsArray.map(
        async (academicInfo) =>
          await this.academicsEntity.destroy({
            where: { id: academicInfo.id },
          }),
      ),
    );

    await Promise.all(
      academics.map(async (academic) => {
        await this.academicsEntity.create(academic);
      }),
    );

    const languagesArray = await this.getAllLanguages(candidateID);
    await Promise.all(
      languagesArray.map(
        async (language) =>
          await this.languagesEntity.destroy({ where: { id: language.id } }),
      ),
    );

    await Promise.all(
      languages.map(
        async (language) => await this.languagesEntity.create(language),
      ),
    );

    const previousJobsArray = await this.getAllPreviousJobs(candidateID);
    await Promise.all(
      previousJobsArray.map(
        async (previousJob) =>
          await this.previousJobsEntity.destroy({
            where: { id: previousJob.id },
          }),
      ),
    );

    await Promise.all(
      previousJobs.map(
        async (previousJob) =>
          await this.previousJobsEntity.create(previousJob),
      ),
    );

    const personalDataUpdated = await this.getPersonalData(candidateID);
    const academicUpdated = await this.getAllAcademics(candidateID);
    const languageUpdated = await this.getAllLanguages(candidateID);
    const previousJobsUpdated = await this.getAllPreviousJobs(candidateID);

    const resume = {
      personalData: personalDataUpdated,
      academics: academicUpdated,
      languages: languageUpdated,
      previousJobs: previousJobsUpdated,
    };

    return resume;
  }
}
