import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

 
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
  

  @Get('filter')
  async filter(
    @Query('name') name?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('stockAvailable') stockAvailable?: string,
  ): Promise<Product[]> {
    const stockBool =
      stockAvailable !== undefined ? stockAvailable === 'true' : undefined;

    return this.productsService.filter({
      name,
      startDate,
      endDate,
      stockAvailable: stockBool,
    });
  }
}
