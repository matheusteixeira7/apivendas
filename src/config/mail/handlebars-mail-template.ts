import handlebars from 'handlebars'

interface ITemplateVariable {
  [key: string]: string | number
}

interface IParseMailTemplate {
  template: string
  variables: ITemplateVariable
}

export class HandlebarsMailTemplate {
  async parse ({ template, variables }: IParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables)
  }
}
