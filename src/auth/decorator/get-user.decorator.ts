import { ExecutionContext, createParamDecorator } from '@nestjs/common'

/**
 * jwt.strategy.tsのvalidateメソッドからUser情報を取得している
 * 認証を行なっていない処理ではこれを使用してもUser情報は取得できない
 * @param {any} (_
 * @param {ExecutionContext} ctx
 * @returns {Object} user
 * @returns {string} user.id
 * @returns {string} user.username
 * @returns {string} user.password
 * @returns {'FREE' | 'PREMIUM'} user.status
 * @returns {Item[]} user.items
 */
export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
