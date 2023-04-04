import { Request, Response } from 'express';
import User from '../models/user/user.model';
import * as uuid from 'uuid';

async function find(req: Request, res: Response) {
  const users = await User.scan().exec();
  res.json({
    items: users,
    total: users.length,
  });
}

async function findById(req: Request, res: Response) {
  const id = req.params.id;
  const user = await User.get(id);
  if (!user) throw new Error('Not found user');
  res.json({
    item: user,
  });
}

async function create(req: Request, res: Response) {
  const data = req.body;
  const user = new User({
    id: uuid.v4(),
    ...data,
  });
  await user.save();
  res.json({ item: user });
}

async function update(req: Request, res: Response) {
  const id = req.params.id;

  const data = req.body;

  const user = await User.get(id);
  if (!user) {
    throw new Error('Not found user');
  }

  delete data['id'];
  delete data['createdAt'];
  delete data['updatedAt'];

  Object.assign(user, data);

  await user.save();
  res.json({ item: user });
}

async function remove(req: Request, res: Response) {
  const id = req.params.id;

  const user = await User.get(id);
  if (!user) {
    throw new Error('Not found user');
  }

  await user.delete();
  res.json({ item: user });
}

export default {
  find,
  findById,
  create,
  update,
  remove,
};
