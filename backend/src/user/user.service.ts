import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        providerId: id,
      },
    });
    return user;
  }

  async uploadImage(imageUrl: string, id: string) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' }); // download the image data
    const uploadDir = path.join(__dirname, '../../uploads/');
    // const extension = path.extname(imageUrl); // get the extension of the image
    const uploadPath = path.join(uploadDir, `${id}${'.png'}`); // use the id as the filename

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // create the directory if it doesn't exist
    }

    fs.writeFileSync(uploadPath, response.data); // write the image data to a new file

    console.log(`Image uploaded to ${uploadPath}`);
  }

  // async uploadImage(imageUrl: string) {
  //   const response = await axios.get(imageUrl, { responseType: 'arraybuffer' }); // download the image data
  //   const uploadDir = path.join(__dirname, '../../uploads/');
  //   const uploadPath = path.join(uploadDir, path.basename(imageUrl)); // define the upload path

  //   if (!fs.existsSync(uploadDir)) {
  //       fs.mkdirSync(uploadDir); // create the directory if it doesn't exist
  //   }

  //   fs.writeFileSync(uploadPath, response.data); // write the image data to a new file

  //   console.log(`Image uploaded to ${uploadPath}`);
  // }

  //   @Post('uploads/:id')
  // @UseInterceptors(FileInterceptor('file', {
  //     storage: diskStorage({
  //     destination: './uploads/groupsImages',
  //     filename: (req, file, callback) => {
  //         const filename = path.parse(file.originalname).name + uuid.v4();
  //         const extension = path.parse(file.originalname).ext;
  //         callback(null, filename + extension);
  //     },
  //     }),
  // }))
  // uploadFile(@UploadedFile() file) {
  //     return (file.path);
  // }

  async findOrCreate(data: Prisma.UserCreateInput) {
    let user: User | null = null;
    let suffix = '';

    console.log('data', data);
    while (!user) {
      try {
        user = await this.prismaService.user.upsert({
          create: {
            ...data,
            nickName: `${data.nickName}${suffix}`,
          },
          update: {},
          where: { providerId: data.providerId },
        });
      } catch (error) {
        if (
          !(error instanceof PrismaClientKnownRequestError) ||
          error.code !== 'P2002'
        )
          throw error;

        suffix = `-${uuid.v4().substring(0, 5)}`;
      }
    }

    return user;
  }
}
