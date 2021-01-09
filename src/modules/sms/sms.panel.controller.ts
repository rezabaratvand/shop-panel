import { Controller } from '@nestjs/common';
import { prefix } from 'src/constants/prefix-panel.constant';
import { SmsService } from './sms.service';
@Controller(`${prefix}/sms`)
export class SmsController {
  constructor(private readonly smsService: SmsService) {}
}
