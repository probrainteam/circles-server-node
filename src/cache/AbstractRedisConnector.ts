import config from '../conf';

abstract class AbstractRedisConnector {
  readonly _redisURL: string;
  protected connection: any;
  protected redis = require('redis');

  constructor() {
    // @TODO .env 기반으로 변경
    this._redisURL = config.redis.url;
  }
  public async connect(): Promise<any> {
    this.connection = await this.redis.createClient({
      url: this._redisURL,
    });
    await this.connection.connect();
    return this.getConnection();
  }
  public getConnection(): any {
    return this.connection;
  }
}
export { AbstractRedisConnector };
