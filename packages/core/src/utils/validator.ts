import type { FormItemRule } from 'element-plus'

/**
 * Required validation rule
 */
export const required = (message = '此项为必填项'): FormItemRule => ({
  required: true,
  message,
  trigger: ['blur', 'change']
})

/**
 * Email validation rule
 */
export const email = (message = '请输入正确的邮箱地址'): FormItemRule => ({
  type: 'email',
  message,
  trigger: ['blur', 'change']
})

/**
 * Phone validation rule (Chinese mobile phone)
 */
export const phone = (message = '请输入正确的手机号码'): FormItemRule => ({
  pattern: /^1[3-9]\d{9}$/,
  message,
  trigger: ['blur', 'change']
})

/**
 * ID card validation rule (Chinese ID card)
 */
export const idCard = (message = '请输入正确的身份证号码'): FormItemRule => ({
  pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  message,
  trigger: ['blur', 'change']
})

/**
 * URL validation rule
 */
export const url = (message = '请输入正确的URL地址'): FormItemRule => ({
  type: 'url',
  message,
  trigger: ['blur', 'change']
})

/**
 * Number validation rule
 */
export const number = (message = '请输入数字'): FormItemRule => ({
  type: 'number',
  message,
  trigger: ['blur', 'change']
})

/**
 * Integer validation rule
 */
export const integer = (message = '请输入整数'): FormItemRule => ({
  pattern: /^-?\d+$/,
  message,
  trigger: ['blur', 'change']
})

/**
 * Positive integer validation rule
 */
export const positiveInteger = (message = '请输入正整数'): FormItemRule => ({
  pattern: /^[1-9]\d*$/,
  message,
  trigger: ['blur', 'change']
})

/**
 * Min length validation rule
 */
export const minLength = (min: number, message?: string): FormItemRule => ({
  min,
  message: message || `长度不能少于${min}个字符`,
  trigger: ['blur', 'change']
})

/**
 * Max length validation rule
 */
export const maxLength = (max: number, message?: string): FormItemRule => ({
  max,
  message: message || `长度不能超过${max}个字符`,
  trigger: ['blur', 'change']
})

/**
 * Range length validation rule
 */
export const rangeLength = (min: number, max: number, message?: string): FormItemRule => ({
  min,
  max,
  message: message || `长度在${min}到${max}个字符之间`,
  trigger: ['blur', 'change']
})

/**
 * Min value validation rule
 */
export const minValue = (min: number, message?: string): FormItemRule => ({
  validator: (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined) {
      callback()
    } else if (Number(value) < min) {
      callback(new Error(message || `不能小于${min}`))
    } else {
      callback()
    }
  },
  trigger: ['blur', 'change']
})

/**
 * Max value validation rule
 */
export const maxValue = (max: number, message?: string): FormItemRule => ({
  validator: (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined) {
      callback()
    } else if (Number(value) > max) {
      callback(new Error(message || `不能大于${max}`))
    } else {
      callback()
    }
  },
  trigger: ['blur', 'change']
})

/**
 * Password validation rule
 */
export const password = (message = '密码必须包含字母和数字，长度6-20位'): FormItemRule => ({
  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
  message,
  trigger: ['blur', 'change']
})

/**
 * Username validation rule
 */
export const username = (message = '用户名只能包含字母、数字、下划线，长度4-20位'): FormItemRule => ({
  pattern: /^[a-zA-Z0-9_]{4,20}$/,
  message,
  trigger: ['blur', 'change']
})

/**
 * Custom regex validation rule
 */
export const pattern = (regex: RegExp, message: string): FormItemRule => ({
  pattern: regex,
  message,
  trigger: ['blur', 'change']
})

/**
 * Create custom validation rule
 */
export const custom = (validator: FormItemRule['validator'], trigger: ['blur', 'change'] | 'blur' | 'change' = ['blur', 'change']): FormItemRule => ({
  validator,
  trigger
})