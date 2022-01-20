import expressLoader from './express';
import mysqlLoader from './mysql';

export default async ({ expressApp } : {expressApp: any}) => {
    const mysqlConnection = await mysqlLoader();
    await expressLoader({ app: expressApp });
    console.log('Express Intialized');
}