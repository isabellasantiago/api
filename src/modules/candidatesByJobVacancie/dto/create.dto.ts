import { ApiProperty } from "@nestjs/swagger";

export class CreateDTO {
    @ApiProperty()
    jobVacancieID: number;

    @ApiProperty()
    candidateID: number;

    @ApiProperty()
    percentage?: number;
}