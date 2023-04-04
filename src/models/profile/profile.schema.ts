import * as dynamoose from 'dynamoose';

export default new dynamoose.Schema(
  {
    id: {
      hashKey: true,
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    phone: String,
    address: String,
    birthDay: String,
  },
  {
    timestamps: true
  },
);
