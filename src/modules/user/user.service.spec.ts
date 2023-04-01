import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

const fakeData = [
  {
    name: 'Test',
    email: 'test@gmai.com',
    password: '12344',
  },
];

const serviceMock = {
  create: jest.fn().mockReturnValue(fakeData[0]),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: UserService, useValue: serviceMock }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('Create User', async () => {
    await service.create(fakeData[0]);

    expect(service.create).toBeCalledWith(fakeData[0]);
  });
});
