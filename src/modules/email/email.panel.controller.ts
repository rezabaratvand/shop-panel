import { Controller } from '@nestjs/common';
import { prefix } from 'src/constants/prefix-panel.constant';
import { EmailService } from './email.service';
@Controller(`${prefix}/email`)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
}
