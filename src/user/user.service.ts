import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne() {
    return 'wait for local passport';
  }

  async createUserFromGoogleLogin(googleProfile: GoogleProfile): Promise<User> {
    const newUser = this.userRepository.create({
      oauthType: 'google',
      oauthId: googleProfile.id,
      email: googleProfile.emails[0].value,
      name: `${googleProfile.name.givenName} ${googleProfile.name.familyName}`,
      avatar: googleProfile.photos[0].value,
    });

    return this.userRepository.save(newUser);
  }

  async findUserByGoogleLogin(googleProfile: GoogleProfile): Promise<User | null> {
    return await this.userRepository.findOneBy({
      oauthType: 'google',
      oauthId: googleProfile.id,
      email: googleProfile.emails[0].value,
    });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
}

interface GoogleProfile {
  emails: { value: string }[];
  photos: { value: string }[];
  name: { givenName: string; familyName: string };
  id: string;
}
