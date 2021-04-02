import Logger from '../util/logger';
import { GraphQLRequestContext } from 'apollo-server-types';

export const loggerPlugin = {
  requestDidStart(requestContext: GraphQLRequestContext) {
    Logger.debug(`Received query ${JSON.stringify(requestContext.request)}`);

    return {
      parsingDidStart() {
        return (err: any) => {
          if (err) {
            Logger.debug(`Error occurred while parsing ${err}`);
          }
        };
      },

      validationDidStart() {
        return (err: any) => {
          if (err) {
            err.forEach((err: any) =>
              Logger.error(`Error occurred while validation ${err}`)
            );
          }
        };
      },
      executionDidStart() {
        return (err: any) => {
          if (err) {
            Logger.debug(`Error occurred while execution ${err}`);
          }
        };
      },
      willSendResponse(requestContext: GraphQLRequestContext) {
        Logger.debug(`Response ${JSON.stringify(requestContext.response)}`);
      },
    };
  },
};
