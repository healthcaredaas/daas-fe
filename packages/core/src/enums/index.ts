// Enums index

/**
 * Status enum
 */
export enum Status {
  ENABLED = 1,
  DISABLED = 0
}

/**
 * Yes/No enum
 */
export enum YesNo {
  YES = 1,
  NO = 0
}

/**
 * Delete flag enum
 */
export enum DeleteFlag {
  NORMAL = 0,
  DELETED = 1
}

/**
 * Gender enum
 */
export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2
}

/**
 * Data type enum
 */
export enum DataType {
  STRING = 'string',
  INTEGER = 'integer',
  LONG = 'long',
  DOUBLE = 'double',
  DECIMAL = 'decimal',
  BOOLEAN = 'boolean',
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
  TEXT = 'text',
  JSON = 'json',
  ARRAY = 'array'
}

/**
 * Dict type enum
 */
export enum DictType {
  STANDARD = 'concept',      // 标准字典
  TERMINOLOGY = 'term',      // 主数据术语
  CUSTOM = 'custom'          // 自定义字典
}

/**
 * HTTP method enum
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

/**
 * Menu type enum
 */
export enum MenuType {
  DIRECTORY = 1,   // 目录
  MENU = 2,        // 菜单
  BUTTON = 3       // 按钮
}

/**
 * Result code enum
 */
export enum ResultCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}