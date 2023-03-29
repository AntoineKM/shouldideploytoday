import { REASONS_TO_DEPLOY, REASONS_TO_NOT_DEPLOY } from '@constants/reasons';
import getRandom from '@utils/getRandom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import type { NextApiRequest, NextApiResponse } from 'next'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Europe/Paris")

export type ShouldIDeployResponse = {
  date: string,
  shouldideploy: boolean
  message: string
}
export default function handler(
req: NextApiRequest,
res: NextApiResponse<ShouldIDeployResponse>
) {
  const date = req.query.date ? dayjs(req.query.date as string) : dayjs();
  const shouldideploy =  date.day() !== 5;
  res.status(200).json({
    date: date.toISOString(),
    shouldideploy,
    message: getRandom(shouldideploy ? REASONS_TO_DEPLOY : REASONS_TO_NOT_DEPLOY)
  })
}
