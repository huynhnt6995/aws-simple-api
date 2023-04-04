import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import profileSchema from './profile.schema';

class Profile extends Item {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  birthDat?: string;
}

const tableName = process.env.TABLE_USERS as string;

export default dynamoose.model<Profile>(tableName, profileSchema, { create: false, waitForActive: false });
