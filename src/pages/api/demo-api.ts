

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // 返回一个简单的 JSON 响应
    res.status(200).json({ message: 'This is a demo API response!' });
  };