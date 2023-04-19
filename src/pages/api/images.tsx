import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dirPath = req.query.p as string;
  const extension = req.query.e as string;

  if (!dirPath) {
    res.status(400).json({ message: "Invalid path or extension" });
    return;
  }

  const imagesDir = path.join(process.cwd(), "public/images", dirPath);
  const fileNames = fs.readdirSync(imagesDir);

  if (extension) {
    const files = fileNames.filter((file) => file.endsWith("." + extension));
    res.status(200).json(files);
    return;
  }

  res.status(200).json(fileNames);
}
