import { ApiProperty } from "@nestjs/swagger";

export class CandidatesInfoDTO {
    @ApiProperty()
    candidateID: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    imageURL: string;

    @ApiProperty()
    profession: string;

    @ApiProperty()
    experienceTime: number;

    @ApiProperty()
    percentage: number;
}