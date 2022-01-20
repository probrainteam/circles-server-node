import expressLoader from './express';

export default async ({ expressApp } : {expressApp: any}) => {
    await expressLoader({ app: expressApp });
    console.log('Express Intialized');
}