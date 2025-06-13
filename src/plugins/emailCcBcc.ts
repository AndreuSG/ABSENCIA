import type { Plugin } from 'payload'
import type { SendEmailOptions } from 'payload'

export const emailCcBccPlugin = (): Plugin => {
  return (config) => {
    const originalInit = config.onInit

    config.onInit = async (payload) => {
      const originalSendEmail = payload.sendEmail.bind(payload)

      payload.sendEmail = async (args: SendEmailOptions & { req?: any }) => {
        const { req } = args

        const cc = req?.data?.cc || req?.body?.cc
        const bcc = req?.data?.bcc || req?.body?.bcc

        return originalSendEmail({
          ...args,
          cc: cc || args.cc,
          bcc: bcc || args.bcc,
        })
      }

      if (originalInit) await originalInit(payload)
    }

    return config
  }
}
