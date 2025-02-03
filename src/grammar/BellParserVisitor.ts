// Generated from ./src/grammar/BellParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { NamedParamStatementContext } from "./BellParser";
import { IdentifierParamStatementContext } from "./BellParser";
import { ProgramContext } from "./BellParser";
import { SourceElementContext } from "./BellParser";
import { SourceElementsContext } from "./BellParser";
import { StatementContext } from "./BellParser";
import { EosContext } from "./BellParser";
import { NamedVariableContext } from "./BellParser";
import { IdentifierContext } from "./BellParser";
import { SingleExpressionContext } from "./BellParser";
import { AssignableContext } from "./BellParser";
import { VariableDeclarationContext } from "./BellParser";
import { RequestStatementContext } from "./BellParser";
import { RequestBuildingStatementContext } from "./BellParser";
import { UrlStatementContext } from "./BellParser";
import { ParamStatementContext } from "./BellParser";
import { CommandStatementContext } from "./BellParser";
import { LogStatementContext } from "./BellParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `BellParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface BellParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `NamedParamStatement`
	 * labeled alternative in `BellParser.paramStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamedParamStatement?: (ctx: NamedParamStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `IdentifierParamStatement`
	 * labeled alternative in `BellParser.paramStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierParamStatement?: (ctx: IdentifierParamStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.sourceElement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSourceElement?: (ctx: SourceElementContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.sourceElements`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSourceElements?: (ctx: SourceElementsContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.eos`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEos?: (ctx: EosContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.namedVariable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamedVariable?: (ctx: NamedVariableContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingleExpression?: (ctx: SingleExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.assignable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignable?: (ctx: AssignableContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.variableDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableDeclaration?: (ctx: VariableDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.requestStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRequestStatement?: (ctx: RequestStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.requestBuildingStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRequestBuildingStatement?: (ctx: RequestBuildingStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.urlStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUrlStatement?: (ctx: UrlStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.paramStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamStatement?: (ctx: ParamStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.commandStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommandStatement?: (ctx: CommandStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `BellParser.logStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogStatement?: (ctx: LogStatementContext) => Result;
}

