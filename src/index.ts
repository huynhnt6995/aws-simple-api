import * as express from 'express';
import * as serverless from 'serverless-http';
import * as dynamoose from 'dynamoose';
import userController from './user/user.controller';

const app = express();

function configDb() {
  const { REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env as Record<string, string>;

  const ddb = new dynamoose.aws.ddb.DynamoDB({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });

  dynamoose.aws.ddb.set(ddb);
}

configDb();
app.use(express.json());

app.post('/users', userController.create);
app.get('/users', userController.find);
app.get('/users/:id', userController.findById);
app.put('/users/:id', userController.update);
app.delete('/users/:id', userController.remove);

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

export default serverless(app);
