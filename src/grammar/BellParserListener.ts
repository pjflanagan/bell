// Generated from ./src/grammar/BellParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `BellParser`.
 */
export interface BellParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `NamedParamStatement`
	 * labeled alternative in `BellParser.paramStatement`.
	 * @param ctx the parse tree
	 */
	enterNamedParamStatement?: (ctx: NamedParamStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `NamedParamStatement`
	 * labeled alternative in `BellParser.paramStatement`.
	 * @param ctx the parse tree
	 */
	exitNamedParamStatement?: (ctx: NamedParamStatementContext) => void;

	/**
	 * Enter a parse tree produced by the `IdentifierParamStatement`
	 * labeled alternative in `BellParser.paramStatement`.
	 * @param ctx the parse tree
	 */
	enterIdentifierParamStatement?: (ctx: IdentifierParamStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `IdentifierParamStatement`
	 * labeled alternative in `BellParser.paramStatement`.
	 * @param ctx the parse tree
	 */
	exitIdentifierParamStatement?: (ctx: IdentifierParamStatementContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.sourceElement`.
	 * @param ctx the parse tree
	 */
	enterSourceElement?: (ctx: SourceElementContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.sourceElement`.
	 * @param ctx the parse tree
	 */
	exitSourceElement?: (ctx: SourceElementContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.sourceElements`.
	 * @param ctx the parse tree
	 */
	enterSourceElements?: (ctx: SourceElementsContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.sourceElements`.
	 * @param ctx the parse tree
	 */
	exitSourceElements?: (ctx: SourceElementsContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.eos`.
	 * @param ctx the parse tree
	 */
	enterEos?: (ctx: EosContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.eos`.
	 * @param ctx the parse tree
	 */
	exitEos?: (ctx: EosContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.namedVariable`.
	 * @param ctx the parse tree
	 */
	enterNamedVariable?: (ctx: NamedVariableContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.namedVariable`.
	 * @param ctx the parse tree
	 */
	exitNamedVariable?: (ctx: NamedVariableContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterSingleExpression?: (ctx: SingleExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitSingleExpression?: (ctx: SingleExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.assignable`.
	 * @param ctx the parse tree
	 */
	enterAssignable?: (ctx: AssignableContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.assignable`.
	 * @param ctx the parse tree
	 */
	exitAssignable?: (ctx: AssignableContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.variableDeclaration`.
	 * @param ctx the parse tree
	 */
	enterVariableDeclaration?: (ctx: VariableDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.variableDeclaration`.
	 * @param ctx the parse tree
	 */
	exitVariableDeclaration?: (ctx: VariableDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.requestStatement`.
	 * @param ctx the parse tree
	 */
	enterRequestStatement?: (ctx: RequestStatementContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.requestStatement`.
	 * @param ctx the parse tree
	 */
	exitRequestStatement?: (ctx: RequestStatementContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.requestBuildingStatement`.
	 * @param ctx the parse tree
	 */
	enterRequestBuildingStatement?: (ctx: RequestBuildingStatementContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.requestBuildingStatement`.
	 * @param ctx the parse tree
	 */
	exitRequestBuildingStatement?: (ctx: RequestBuildingStatementContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.urlStatement`.
	 * @param ctx the parse tree
	 */
	enterUrlStatement?: (ctx: UrlStatementContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.urlStatement`.
	 * @param ctx the parse tree
	 */
	exitUrlStatement?: (ctx: UrlStatementContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.paramStatement`.
	 * @param ctx the parse tree
	 */
	enterParamStatement?: (ctx: ParamStatementContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.paramStatement`.
	 * @param ctx the parse tree
	 */
	exitParamStatement?: (ctx: ParamStatementContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.commandStatement`.
	 * @param ctx the parse tree
	 */
	enterCommandStatement?: (ctx: CommandStatementContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.commandStatement`.
	 * @param ctx the parse tree
	 */
	exitCommandStatement?: (ctx: CommandStatementContext) => void;

	/**
	 * Enter a parse tree produced by `BellParser.logStatement`.
	 * @param ctx the parse tree
	 */
	enterLogStatement?: (ctx: LogStatementContext) => void;
	/**
	 * Exit a parse tree produced by `BellParser.logStatement`.
	 * @param ctx the parse tree
	 */
	exitLogStatement?: (ctx: LogStatementContext) => void;
}

