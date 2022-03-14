import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
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
import { CompanyEntity } from './company.entity';
import { HardSkillsByJobVacanciesEntity } from './hardSkillsByJobVacancies.entity';
import { RequirementsByJobVacanciesEntity } from './requirementsByJobVacancies.entity';
import { SoftSkillsByJobVacanciesEntity } from './softSkillsByJobVacancies.entity';

@Table({ tableName: 'JobVacancies' })
export class JobVacanciesEntity extends Model<JobVacanciesEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => CompanyEntity)
  @Column
  companyID: number;

  @BelongsTo(() => CompanyEntity)
  company: CompanyEntity;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.NUMBER,
  })
  salary: number;

  @Column({
    type: DataType.ENUM({
      values: ['0 - PJ', '1 - CLT', '2 - PJ ou CLT', '3 - OUTROS'],
    }),
  })
  contractType: ContractTypes;

  @Column({
    type: DataType.STRING,
  })
  cityAndState: string;

  @Column({
    type: DataType.ENUM({
      values: ['0 - Estagiário', '1 - JUNIOR', '2 - PLENO', '3 - SENIOR'],
    }),
  })
  level: LevelType;

  @Column({
    type: DataType.ENUM({
      values: [
        '0 - MULHER',
        '1 - MULHER TRANS',
        '2 - PESSOAS TRANS',
        '3 - MULHER (CIS) E PESSOAS TRANS',
      ],
    }),
  })
  gender: GenderTypes;

  @Column({
    type: DataType.ENUM({
      values: ['0 - NEGRO', '1 - INDÍGENA', '3 - AMARELO'],
    }),
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
  paused: boolean;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @HasMany(() => RequirementsByJobVacanciesEntity)
  requirements: RequirementsByJobVacanciesEntity[];

  @HasMany(() => BenefitsByJobVacanciesEntity)
  benefits: BenefitsByJobVacanciesEntity[];

  @HasMany(() => SoftSkillsByJobVacanciesEntity)
  softSkills: SoftSkillsByJobVacanciesEntity[];

  @HasMany(() => HardSkillsByJobVacanciesEntity)
  hardSkills: HardSkillsByJobVacanciesEntity[];
}
