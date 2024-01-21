// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class UsersService {
//     private users = [
//         {
//             "id": 1,
//             "name": "Leanne Graham",
//             "role": "user",
//         },
//         {
//             "id": 2,
//             "name": "Ervin Howell",
//             "role": "user",
//         },
//         {
//             "id": 3,
//             "name": "Clementine Bauch",
//             "role": "admin",
//         },
//         {
//             "id": 4,
//             "name": "Patricia Lebsack",
//             "role": "admin",
//         },
//         {
//             "id": 5,
//             "name": "Chelsey Dietrich",
//             "role": "admin",
//         }
//     ]

//     findAll(role?: 'admin' | 'user') {
//         if(role)
//         {
//             return this.users.filter(users => users.role === role)
//         }
//         return this.users
//     }

//     findOne(id: number) {
//         const user = this.users.find(user => user.id === id)
//         return user
//     }

//     create(user: {name: string, role: 'admin' | 'user'}) {
//         const userWithId = [...this.users].sort((a, b) => b.id - a.id)
//         const newUser = {
//             id: userWithId[0].id + 1,
//             ...user
//         }
//         this.users.push(newUser)
//         return newUser
//     }

//     update(id: number, userUpdate: {name?: string, role?: 'admin' | 'user'}) {
//         this.users = this.users.map(user => {
//             if(user.id === id) {
//                 return {...user,...userUpdate}
//             }
//             return user
//         })
//         return this.findOne(id)
//     }

//     delete(id: number) {
//         const removedUser  = this.findOne(id)
//         this.users = this.users.filter(user => user.id !== id)
//         return removedUser
//     }

// }


import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
