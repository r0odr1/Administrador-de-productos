import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    tags:[
      {
        name: 'Products',
        description: 'API operations related to products'
      }
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for Products",
    }
  },
  apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options);

// La variable swaggerUiOptions, sirve para cambiar varias cosas, por ejemplo el logo de swagger para que sea el que deseas, titulos entre otroas cosas, como lo realizas
// Solo inspecciona el logo, o la barra, colocale las mismas clases y ya lo cambias a gusto:

const swaggerUiOptions : SwaggerUiOptions = {
  // Con customCss usandolo de esta manera puedes cambiar el logo de swagger por que el necesites:
  // customCss: `
  //   .topbar-wrapper .link {
  //     content: url('https://example.com/logo.png');
  //     height: 80px;
  //     width: auto;
  //   }

  // Si quieres cambiar el color de la barra superior de swagger, puedes hacerlo asi:

  //   .swagger-ui .topbar {
  //     background-color: Color que quieras;
  //   }
  // `,

  // Con customSiteTitle puedes cambiar el titulo de la pestana del navegador
  customSiteTitle: 'Documentación REST API Express / TypeScript'

  //Por ultimo para que se vean los cambios, se exporta como esta abajo
}

export default swaggerSpec;

// Se exporta de esta maneta la variable swaggerUiOptions, luego vas al server y lo importas
export { swaggerUiOptions };