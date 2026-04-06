import {
  ExpressionContext,
  StringLiteralExpressionContext,
  DecimalLiteralExpressionContext,
  BooleanLiteralExpressionContext,
  NullLiteralExpressionContext,
  IdentifierExpressionContext,
  ResponseExpressionContext,
  ObjectLiteralExpressionContext,
  ArrayLiteralExpressionContext,
  MemberIndexExpressionContext,
  ArrayAccessExpressionContext,
  AdditiveExpressionContext,
  BinaryExpressionContext,
  InputCallExpressionContext,
  WarnCallExpressionContext,
} from '../grammar/BellParser';

export function formatExpr(ctx: ExpressionContext, indent: number = 0): string {
  if (ctx instanceof StringLiteralExpressionContext) {
    return formatString(ctx.text);
  }
  if (ctx instanceof DecimalLiteralExpressionContext) {
    return ctx.text;
  }
  if (ctx instanceof BooleanLiteralExpressionContext) {
    return ctx.text;
  }
  if (ctx instanceof NullLiteralExpressionContext) {
    return 'null';
  }
  if (ctx instanceof IdentifierExpressionContext) {
    return ctx.text;
  }
  if (ctx instanceof ResponseExpressionContext) {
    return 'response';
  }
  if (ctx instanceof MemberIndexExpressionContext) {
    return `${formatExpr(ctx.expression(), indent)}.${ctx.memberIdentifier().text}`;
  }
  if (ctx instanceof ArrayAccessExpressionContext) {
    return `${formatExpr(ctx.expression(0), indent)}.[${formatExpr(ctx.expression(1), indent)}]`;
  }
  if (ctx instanceof AdditiveExpressionContext) {
    return `${formatExpr(ctx.expression(0), indent)} + ${formatExpr(ctx.expression(1), indent)}`;
  }
  if (ctx instanceof BinaryExpressionContext) {
    const op = ctx.getChild(1).text;
    return `${formatExpr(ctx.expression(0), indent)} ${op} ${formatExpr(ctx.expression(1), indent)}`;
  }
  if (ctx instanceof ObjectLiteralExpressionContext) {
    return formatObject(ctx, indent);
  }
  if (ctx instanceof ArrayLiteralExpressionContext) {
    return formatArray(ctx, indent);
  }
  if (ctx instanceof InputCallExpressionContext) {
    const inputCall = ctx.inputCall();
    const argExpr = inputCall.expression();
    return argExpr ? `input(${formatExpr(argExpr, indent)})` : 'input()';
  }
  if (ctx instanceof WarnCallExpressionContext) {
    return `warn ${formatExpr(ctx.warnCall().expression(), indent)}`;
  }
  return ctx.text;
}

// Normalize string quotes: backticks for strings with {interpolation}, double quotes otherwise.
export function formatString(raw: string): string {
  const inner = raw.substring(1, raw.length - 1);
  if (/\{[^}]+\}/.test(inner)) {
    return '`' + inner + '`';
  }
  return '"' + inner + '"';
}

function formatObject(ctx: ObjectLiteralExpressionContext, indent: number): string {
  const props = ctx.objectLiteral().propertyAssignment();
  if (props.length === 0) return '{}';
  const pad = '  '.repeat(indent + 1);
  const closePad = '  '.repeat(indent);
  const lines = props.map((prop, i) => {
    const key = prop.StringLiteral()
      ? formatString(prop.StringLiteral()!.text)
      : prop.identifier()!.text;
    const value = formatExpr(prop.expression(), indent + 1);
    const comma = i < props.length - 1 ? ',' : '';
    return `${pad}${key}: ${value}${comma}`;
  });
  return `{\n${lines.join('\n')}\n${closePad}}`;
}

function formatArray(ctx: ArrayLiteralExpressionContext, indent: number): string {
  const exprs = ctx.arrayLiteral().expression();
  if (exprs.length === 0) return '[]';
  const pad = '  '.repeat(indent + 1);
  const closePad = '  '.repeat(indent);
  const lines = exprs.map((expr, i) => {
    const comma = i < exprs.length - 1 ? ',' : '';
    return `${pad}${formatExpr(expr, indent + 1)}${comma}`;
  });
  return `[\n${lines.join('\n')}\n${closePad}]`;
}
