import { join, resolve } from 'path';
import { ApolloServer } from 'apollo-server-micro';
import { makeSchema, objectType } from '@prisma/nexus';
import Photon from '@generated/photon';
import { nexusPrismaPlugin } from '@generated/nexus-prisma';
import { Context } from './types';

const photon = new Photon();

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon
});

// const User = objectType({
//   name: 'User',
//   definition(t) {
//     t.model.id()
//     t.model.name()
//     t.model.email()
//   },
// })

const Query = objectType({
  name: 'Query',
  definition(t) {
    // t.crud.findManyUser({ alias: 'users' })
    // t.crud.findOneUser()
    t.field('test', {
      type: 'String',
      resolve: () => {
        return 'hii it worked';
      }
    });
  }
});

// const Mutation = objectType({
//   name: 'Mutation',
//   definition(t) {
//     // t.crud.createOneUser()
//   },
// })

const schema = makeSchema({
  types: [Query, nexusPrisma],
  outputs: {
    typegen: join(__dirname, 'generated/nexus-typegen.ts'),
    schema: join(__dirname, 'schema.graphql')
    // typegen: 'graphql/generated/nexus-typegen.ts',
    // schema: 'graphql/schema.graphql'
  },
  typegenAutoConfig: {
    sources: [{ source: '@generated/photon', alias: 'photon' }, { source: join(__dirname, 'types.ts'), alias: 'ctx' }],
    contextType: 'ctx.Context'
  }
});

export const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: { photon }
});
