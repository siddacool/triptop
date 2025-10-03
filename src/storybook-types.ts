type ControlType =
  | 'object'
  | 'boolean'
  | 'check'
  | 'inline-check'
  | 'radio'
  | 'inline-radio'
  | 'select'
  | 'multi-select'
  | 'number'
  | 'range'
  | 'file'
  | 'color'
  | 'date'
  | 'text';

interface ControlBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  /** @see https://storybook.js.org/docs/api/arg-types#controltype */
  type?: ControlType;
  disable?: boolean;
}

type Control =
  | ControlType
  | false
  | (ControlBase &
      (
        | ControlBase
        | {
            type: 'color';
            /** @see https://storybook.js.org/docs/api/arg-types#controlpresetcolors */
            presetColors?: string[];
          }
        | {
            type: 'file';
            /** @see https://storybook.js.org/docs/api/arg-types#controlaccept */
            accept?: string;
          }
        | {
            type: 'inline-check' | 'radio' | 'inline-radio' | 'select' | 'multi-select';
            /** @see https://storybook.js.org/docs/api/arg-types#controllabels */
            labels?: {
              [options: string]: string;
            };
          }
        | {
            type: 'number' | 'range';
            /** @see https://storybook.js.org/docs/api/arg-types#controlmax */
            max?: number;
            /** @see https://storybook.js.org/docs/api/arg-types#controlmin */
            min?: number;
            /** @see https://storybook.js.org/docs/api/arg-types#controlstep */
            step?: number;
          }
      ));

type ConditionalTest =
  | {
      truthy?: boolean;
    }
  | {
      exists: boolean;
    }
  | {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      eq: any;
    }
  | {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      neq: any;
    };
type ConditionalValue =
  | {
      arg: string;
    }
  | {
      global: string;
    };
type Conditional = ConditionalValue & ConditionalTest;

interface Args {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}

interface SBBaseType {
  required?: boolean;
  raw?: string;
}
type SBScalarType = SBBaseType & {
  name: 'boolean' | 'string' | 'number' | 'function' | 'symbol';
};
type SBArrayType = SBBaseType & {
  name: 'array';
  value: SBType;
};
type SBObjectType = SBBaseType & {
  name: 'object';
  value: Record<string, SBType>;
};
type SBEnumType = SBBaseType & {
  name: 'enum';
  value: (string | number)[];
};
type SBIntersectionType = SBBaseType & {
  name: 'intersection';
  value: SBType[];
};
type SBUnionType = SBBaseType & {
  name: 'union';
  value: SBType[];
};
type SBOtherType = SBBaseType & {
  name: 'other';
  value: string;
};

type SBType =
  | SBScalarType
  | SBEnumType
  | SBArrayType
  | SBObjectType
  | SBIntersectionType
  | SBUnionType
  | SBOtherType;

interface InputType {
  /** @see https://storybook.js.org/docs/api/arg-types#control */
  control?: Control;
  /** @see https://storybook.js.org/docs/api/arg-types#description */
  description?: string;
  /** @see https://storybook.js.org/docs/api/arg-types#if */
  if?: Conditional;
  /** @see https://storybook.js.org/docs/api/arg-types#mapping */
  mapping?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  /** @see https://storybook.js.org/docs/api/arg-types#name */
  name?: string;
  /** @see https://storybook.js.org/docs/api/arg-types#options */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: readonly any[];
  /** @see https://storybook.js.org/docs/api/arg-types#table */
  table?: {
    [key: string]: unknown;
    /** @see https://storybook.js.org/docs/api/arg-types#tablecategory */
    category?: string;
    /** @see https://storybook.js.org/docs/api/arg-types#tabledefaultvalue */
    defaultValue?: {
      summary?: string;
      detail?: string;
    };
    /** @see https://storybook.js.org/docs/api/arg-types#tabledisable */
    disable?: boolean;
    /** @see https://storybook.js.org/docs/api/arg-types#tablesubcategory */
    subcategory?: string;
    /** @see https://storybook.js.org/docs/api/arg-types#tabletype */
    type?: {
      summary?: string;
      detail?: string;
    };
  };
  /** @see https://storybook.js.org/docs/api/arg-types#type */
  type?: SBType | SBScalarType['name'];
  /**
   * @deprecated Use `table.defaultValue.summary` instead.
   * @see https://storybook.js.org/docs/api/arg-types#defaultvalue
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type ArgTypes<TArgs = Args> = {
  [name in keyof TArgs]: InputType;
};

export type StoryBookArgTypes = Partial<ArgTypes<Args>>;
