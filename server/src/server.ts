import express from 'express';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express';
// Se importa aqui y luego lo llamas en la misma parte que llamas al spec
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router from './router';
import db from './config/db';

//Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    console.log(colors.blue('Conexión exitosa a la BD'));

  } catch (error) {
    // console.log(error);
    console.log(colors.red.bold('Hubo un error al conectar a la BD'));
  }

}

export const dbConnection = connectDB();

// Instancia de express
const server= express();

// Leer datos de formularios
server.use(express.json());
server.use('/api/products', router);

// Docs

//En esta parte solamente es llamarlo y ya puedes ver los cambios
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;