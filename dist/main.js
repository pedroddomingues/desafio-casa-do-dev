"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const mongo_exception_filter_1 = require("./exceptions/mongo-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new mongo_exception_filter_1.MongoExceptionFilter());
    const options = {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    };
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Desafio Casa do Dev API")
        .setDescription("Esta é a documentação da API proposta no Desafio Casa do Dev.")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup("api", app, document);
    const PORT = process.env.PORT || 3000;
    console.log(`Server running on port ${PORT}`);
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map