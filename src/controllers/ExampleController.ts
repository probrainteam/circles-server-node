import { NextFunction, Request, Response } from 'express';

const exampleControll = async (req: Request, res: Response) => {
  //const returnData :object = await model1.basicQuery("SHOW STATUS LIKE 'Threads_connected';")
  res.send('example');
};
export default { exampleControll };
