import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString({
    message: 'Name must be a string',
  })
  public name: string;
  @IsString({
    message: 'Description must be a string',
  })
  public description: string;
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 4,
  })
  @Type(() => Number)
  public price: number;
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @Type(() => Number)
  public stock: number;
  @IsString({
    message: 'Image must be a string',
  })
  public image: string;
}
