import { server } from '../../graphql';

export const config = {
  api: {
    bodyParser: false
  }
};

export default server.createHandler({ path: '/api/graphql' });
