import { InjectModel } from '@nestjs/sequelize';
import { AcademicsInformationsModel } from 'src/common/models/academicsInformation.model';
import { HardSkillsByCandidateModel } from 'src/common/models/hardSkillsByCandidate.model';
import { LanguagesInformationModel } from 'src/common/models/languagesInformation.model';
import { PersonalDataModel } from 'src/common/models/personalData.model';
import { PreviousJobsModel } from 'src/common/models/previousJobs.model';
import { SoftSkillsByCandidateModel } from 'src/common/models/softSkillsByCandidate.model';
import {
  AcademicsInformationsEntity,
  CandidateEntity,
  HardSkillsByCandidateEntity,
  HardSkillsEntity,
  PersonalDataEntity,
  PreviousJobsEntity,
  SoftSkillsByCandidateEntity,
  SoftSkillsEntity,
} from 'src/entities';
import { LanguagesInformationEntity } from 'src/entities/languagesInformation.entity';
import { CreateCvDTO } from 'src/modules/cv/dto/create-cv-.dto';

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
    @InjectModel(SoftSkillsEntity)
    private readonly softSkillsEntity: typeof SoftSkillsEntity,
    @InjectModel(HardSkillsEntity)
    private readonly hardSkillsEntity: typeof HardSkillsEntity,
    @InjectModel(SoftSkillsByCandidateEntity)
    private readonly softSkillsByCandidateEntity: typeof SoftSkillsByCandidateEntity,
    @InjectModel(HardSkillsByCandidateEntity)
    private readonly hardSkillsByCandidateEntity: typeof HardSkillsByCandidateEntity,
  ) {}

  async createCv({
    candidateID,
    imageURL,
    linkedinURL,
    naturalness,
    gender,
    birthDate,
    state,
    city,
    phone,
    ethnicity,
    isPcd,
    allowsWhatsapp,
    field,
    contractType,
    level,
    role,
    academics,
    languages,
    previousJobs,
    softSkills,
    hardSkills,
  }: CreateCvDTO): Promise<PersonalDataModel> {
    const transaction = await this.personalDataEntity.sequelize.transaction();

    try {
      const personalData = await this.personalDataEntity.create({
        candidateID,
        imageURL,
        linkedinURL,
        naturalness,
        gender,
        birthDate,
        state,
        city,
        phone,
        ethnicity,
        isPcd,
        allowsWhatsapp,
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

      if (softSkills) {
        await Promise.all(
          softSkills.map(async (softSkill) => {
            const convertedSoftSkill = softSkill.toUpperCase();
            const softSkillExists = await this.softSkillsEntity.findOne({
              where: { name: softSkill },
            });

            if (
              softSkillExists &&
              softSkillExists.name === convertedSoftSkill
            ) {
              await this.softSkillsByCandidateEntity.create({
                candidateID,
                softSkillsID: softSkillExists.id,
              });
            }
            const softSkillCreated = await this.softSkillsEntity.create({
              name: convertedSoftSkill,
            });

            await this.softSkillsByCandidateEntity.create({
              candidateID,
              softSkillsID: softSkillCreated.id,
            });
          }),
        );
      }

      if (hardSkills) {
        await Promise.all(
          hardSkills.map(async (hardSkill) => {
            console.log(hardSkill);
            const convertedHardSkill = hardSkill.toUpperCase();
            const hardSkillExists = await this.hardSkillsEntity.findOne({
              where: { name: convertedHardSkill },
            });

            if (
              hardSkillExists &&
              hardSkillExists.name === convertedHardSkill
            ) {
              await this.hardSkillsByCandidateEntity.create({
                candidateID,
                hardSkillsID: hardSkillExists.id,
              });
            }
            const hardSkillCreated = await this.hardSkillsEntity.create({
              name: convertedHardSkill,
            });

            await this.hardSkillsByCandidateEntity.create({
              candidateID,
              hardSkillsID: hardSkillCreated.id,
            });
          }),
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

  async getAllSoftSkills(
    candidateID: number,
  ): Promise<SoftSkillsByCandidateModel[]> {
    const candidate = await this.candidateEntity.findByPk(candidateID);

    if (candidate) {
      const skillsByCandidate = await this.softSkillsByCandidateEntity.findAll({
        where: { candidateID },
        include: { model: SoftSkillsEntity, required: true },
      });

      return skillsByCandidate;
    }
    return [];
  }

  async getAllHardSkills(
    candidateID: number,
  ): Promise<HardSkillsByCandidateModel[]> {
    const candidate = await this.candidateEntity.findByPk(candidateID);

    if (candidate) {
      const skillsByCandidate = await this.hardSkillsByCandidateEntity.findAll({
        where: { candidateID },
        include: { model: HardSkillsEntity, required: true },
      });

      return skillsByCandidate;
    }
    return [];
  }
}
