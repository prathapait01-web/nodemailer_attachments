import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel({
      ...createProductDto,
      createdAt: new Date(),
    });
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async filter(filters: {
    name?: string;
    startDate?: string;
    endDate?: string;
    stockAvailable?: boolean;
  }): Promise<Product[]> {
    const query: any = {};

    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }
    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) {
        query.createdAt.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        query.createdAt.$lte = new Date(filters.endDate);
      }
    }
    if (filters.stockAvailable !== undefined) {
      query.stock = filters.stockAvailable ? { $gt: 0 } : 0;
    }

    return this.productModel.find(query).exec();
  }
}
