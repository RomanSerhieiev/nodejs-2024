import { join } from "node:path";

import { createTransport, Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { configs } from "../configs/configs";
import { emailTemplates } from "../constants/email.constant";
import { EEmailAction } from "../enums/email.enum";
import { ApiError } from "../errors/api.error";
import { TEmailActionToPayload } from "../types/email.type";

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: configs.SMTP_USER,
        pass: configs.SMTP_PASS,
      },
    });

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: join(process.cwd(), "src", "templates", "layouts"),
        partialsDir: join(process.cwd(), "src", "templates", "partials"),
      },
      viewPath: join(process.cwd(), "src", "templates", "views"),
      extName: ".hbs",
    };

    this.transporter.use("compile", hbs(hbsOptions));
  }

  public async send<T extends EEmailAction>(
    to: string,
    emailAction: T,
    context: TEmailActionToPayload[T],
  ): Promise<void> {
    try {
      const { template, subject } = emailTemplates[emailAction];
      context["frontUrl"] = `http://${configs.APP_HOST}:${configs.APP_PORT}`;
      const options = { to, subject, template, context };
      await this.transporter.sendMail(options);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const emailService = new EmailService();
