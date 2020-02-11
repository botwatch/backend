import {StyleRules, StyleRulesCallback, Theme, withStyles} from '@material-ui/core/styles';

export const styled = (styles: any) => withStyles(styles) as any;

export type IStyledProps<T extends string | StyleRules | StyleRulesCallback<any, any> = string,
    IncludeTheme extends boolean | undefined = false> = (IncludeTheme extends true ? { theme: Theme } : {}) & {
    classes?: any;
};
