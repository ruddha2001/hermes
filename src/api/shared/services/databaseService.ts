import { MongoClient, Db } from "mongodb";
import { errors, logger } from "../../../config";

export class DatabaseService {
  private static instance: DatabaseService;
  private client: MongoClient = new MongoClient(process.env.MONGODB_URI!, {
    useUnifiedTopology: true,
  });

  private constructor() {}

  connectDatabase = async () => {
    try {
      await this.client.connect();
      return logger.info("Connected to MongoDB");
    } catch (err) {
      logger.error(err);
      throw errors.MONGODB_CONNECT_ERROR;
    }
  };

  static getInstance = (): DatabaseService => {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  };

  static getMongoDatabase = (): Db => {
    return DatabaseService.instance.client.db();
  };
}
