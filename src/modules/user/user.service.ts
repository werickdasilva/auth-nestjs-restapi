import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/databases/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async isNewEmail(email: string) {
    const isEmail = await this.prismaService.user
      .findFirst({
        where: {
          email,
        },
      })
      .catch(() => undefined);

    if (!!isEmail) {
      throw new NotFoundException('Email is Exist...');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    await this.isNewEmail(createUserDto.email);

    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: passwordHash,
      },
    });
  }
}
