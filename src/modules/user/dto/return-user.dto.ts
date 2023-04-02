import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  name: string;
  email: string;

  constructor(userEntity: UserEntity) {
    this.name = userEntity.name;
    this.email = userEntity.email;
  }

  static convertUserEntity(userEntity: UserEntity): ReturnUserDto {
    return new ReturnUserDto(userEntity);
  }
}
