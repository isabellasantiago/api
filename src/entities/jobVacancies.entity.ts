import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ContractTypes } from 'src/common/enums/contractType.enum';
import { EthnicityTypes } from 'src/common/enums/ethnicityTypes.enum';
import { GenderTypes } from 'src/common/enums/genderTypes.enum';
import { LevelType } from 'src/common/enums/levelType.enum';
import { BenefitsByJobVacanciesEntity } from './benefitsByJobVacancies.entity';
import { JobVacanciesByCompanyEntity } from './jobVacanciesByCompany.entity';
import { RequirementsByJobVacanciesEntity } from './requirementsByJobVacancies.entity';

@Table({ tableName: 'JobVacancies' })
export class JobVacanciesEntity extends Model<JobVacanciesEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.NUMBER,
  })
  salary: number;

  @Column({
    type: DataType.NUMBER,
  })
  contractType: ContractTypes;

  @Column({
    type: DataType.STRING,
  })
  cityAndState: string;

  @Column({
    type: DataType.NUMBER,
  })
  level: LevelType;

  @Column({
    type: DataType.NUMBER,
  })
  gender: GenderTypes;

  @Column({
    type: DataType.NUMBER,
  })
  ethnicity: EthnicityTypes;

  @Column({
    type: DataType.BOOLEAN,
  })
  pcd: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  acceptsAllLevels: boolean;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @HasMany(() => RequirementsByJobVacanciesEntity)
  requirements: RequirementsByJobVacanciesEntity[];

  @HasOne(() => JobVacanciesByCompanyEntity)
  JobVacanciesByCompany: JobVacanciesByCompanyEntity;

  @HasMany(() => JobVacanciesByCompanyEntity)
  company: JobVacanciesByCompanyEntity[];

  @HasMany(() => BenefitsByJobVacanciesEntity)
  benefits: BenefitsByJobVacanciesEntity[];
}
