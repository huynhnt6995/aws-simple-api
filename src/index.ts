import * as express from 'express';
import * as serverless from 'serverless-http';
import * as dynamoose from 'dynamoose';
import userController from './user/user.controller';

const app = express();

const ddb = new dynamoose.aws.ddb.DynamoDB({});
dynamoose.aws.ddb.set(ddb);

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

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
});

export default serverless(app);
