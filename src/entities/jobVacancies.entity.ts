import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
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
      values: ['1 - PJ', '2 - CLT', '3 - PJ ou CLT', '4 - OUTROS'],
    }),
  })
  contractType: ContractTypes;

  @Column({
    type: DataType.STRING,
  })
  about: string;

  @Column({
    type: DataType.STRING,
  })
  cityAndState: string;

  @Column({
    type: DataType.ENUM({
      values: ['1-Estágio', '2-JR', '3-PL', '4-SR', '5-Analista', '6- Agente'],
    }),
  })
  level: LevelType;

  @Column({
    type: DataType.ENUM({
      values: [
        '1 - MULHER',
        '2 - MULHER TRANS',
        '3 - PESSOAS TRANS',
        '4 - MULHER (CIS) E PESSOAS TRANS',
      ],
    }),
  })
  gender: GenderTypes;

  @Column({
    type: DataType.ENUM({
      values: ['1 - NEGRA', '2 - INDÍGENA', '3 - AMARELO'],
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

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
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
