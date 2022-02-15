import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default function swagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('New-Way-Recruiter')
    .setDescription('Documentação das rotas da API New-way-recruiter')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
}
