import { ApiProperty } from "@nestjs/swagger";
import { CandidateModel } from "src/common/models/candidate.model";
import { PersonalDataModel } from "src/common/models/personalData.model";

type Candidate = {
    candidate: CandidateModel;
    personalData: PersonalDataModel;
}

export class AllCandidatesByJobVacancieID {
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

    @ApiProperty()
    candidateInfo: Candidate;
}