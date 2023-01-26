import { ApiProperty } from "@nestjs/swagger";

export class CandidatesByJobVacancieModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    jobVacancieID: number;

    @ApiProperty()
    candidateID: number;

    @ApiProperty()
    isApplied: boolean;

    @ApiProperty()
    matchPercentage: number;

    @ApiProperty()
    createdAt: Date;
    
    @ApiProperty()
    updatedAt: Date;
}