import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDTO {
  @ApiProperty({
    description: 'Nome fantasia da empresa',
    default: 'Ex: Redfox Digital Solutions',
  })
  tradeName?: string;

  @ApiProperty({
    description: 'História da empresa',
  })
  aboutCompany?: string;

  @ApiProperty({
    description: 'Cidade e Estado onde a empresa reside',
    default: 'Cidade, Estado',
  })
  address?: string;

  @ApiProperty({
    description: 'Link da imagem logo da empresa',
    default:
      'https://media-exp1.licdn.com/dms/image/C4D0BAQFc01y5Sfo78Q/company-logo_200_200/0/1625511906142?e=1654128000&v=beta&t=Xs4QyaKZaVMhW9E3syOcCxZZYvjDAJ-2LdWMdXrTynU',
  })
  imageURL?: string;

  @ApiProperty({
    description: 'Link do linkedin da empresa',
    default:
      'https://www.linkedin.com/company/redfoxdigitalsolutions/mycompany/',
  })
  linkedinURL?: string;

  @ApiProperty({
    description: 'Tipo da empresa',
    default: '0 = STARTUP, 1 = TRADICIONAL, 2 = MULTINACIONAL',
  })
  type?: number;

  @ApiProperty({
    description: 'Missão da empresa',
  })
  mission?: string;

  @ApiProperty({
    description: 'Visão da empresa',
  })
  vision?: string;

  @ApiProperty({
    description: 'Valores da empresa',
  })
  values?: string;

  @ApiProperty({
    description: 'Capa do perfil da empresa',
  })
  cover?: string;

  @ApiProperty({
    description: 'Foto de apresentação da empresa',
  })
  photo?: string;
}
