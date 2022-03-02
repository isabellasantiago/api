import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDTO {
  @ApiProperty({
    description: 'CNPJ da empresa',
    default: '65002528000145',
  })
  cnpj: string;

  @ApiProperty({
    description: 'email da empresa',
    default: 'redfox@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha para login',
  })
  password: string;

  @ApiProperty({
    description: 'Nome fantasia da empresa',
    default: 'Redfox Digital Solutions',
  })
  tradeName: string;

  @ApiProperty({
    description: 'Razão Social da empresa',
    default: 'Fulaninha de Tal LTDA.',
  })
  corporateName: string;

  @ApiProperty({
    description: 'Cidade e país localizada a empresa',
    default: 'São Paulo, Brasil',
  })
  address: string;

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
    description: 'História da empresa',
  })
  aboutCompany?: string;

  @ApiProperty({
    description: 'Tipo da empresa',
    default: '0 = STARTUP, 1 = TRADICIONAL, 2 = MULTINACIONAL',
  })
  type?: number;
}
