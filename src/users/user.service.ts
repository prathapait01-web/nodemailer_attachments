import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User,UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(email: string, password: string): Promise<Partial<User>> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });
    const savedUser = await newUser.save();
    return { _id: savedUser._id.toString(), email: savedUser.email };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
