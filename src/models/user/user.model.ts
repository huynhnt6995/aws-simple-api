import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import userSchema from './user.schema';

export interface IUser extends Item {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

const tableName = process.env.TABLE_USERS as string;

export default dynamoose.model<IUser>(tableName, userSchema, { create: false, waitForActive: false });
