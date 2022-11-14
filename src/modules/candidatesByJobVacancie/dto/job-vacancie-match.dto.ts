import { ApiProperty } from "@nestjs/swagger";
import { JobVacanciesModel } from "src/common/models/jobVacancies.model";

export class JobVacancieMatchDTO {
    @ApiProperty()
    jobVacancie: JobVacanciesModel;

    @ApiProperty()
    isApplied: boolean;

    @ApiProperty()
    percentage?: number;
}