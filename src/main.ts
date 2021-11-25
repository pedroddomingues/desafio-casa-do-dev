import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import {
	SwaggerModule,
	DocumentBuilder,
	SwaggerDocumentOptions,
} from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { MongoExceptionFilter } from "./exceptions/mongo-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new MongoExceptionFilter());
	const options: SwaggerDocumentOptions = {
		operationIdFactory: (controllerKey: string, methodKey: string) =>
			methodKey,
	};
	const config = new DocumentBuilder()
		.setTitle("Desafio Casa do Dev API")
		.setDescription(
			"Esta é a documentação da API proposta no Desafio Casa do Dev."
		)
		.setVersion("1.0")
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config, options);
	SwaggerModule.setup("api", app, document);
	const PORT = process.env.PORT || 3000;
	console.log(`Server running on port ${PORT}`);
	await app.listen(PORT);
}
bootstrap();
