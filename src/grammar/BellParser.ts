// Generated from ./src/grammar/BellParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { BellParserListener } from "./BellParserListener";
import { BellParserVisitor } from "./BellParserVisitor";


export class BellParser extends Parser {
	public static readonly MultiLineComment = 1;
	public static readonly SingleLineComment = 2;
	public static readonly Assign = 3;
	public static readonly NullLiteral = 4;
	public static readonly BooleanLiteral = 5;
	public static readonly DecimalLiteral = 6;
	public static readonly HTTPGet = 7;
	public static readonly HTTPPost = 8;
	public static readonly Url = 9;
	public static readonly Param = 10;
	public static readonly Log = 11;
	public static readonly Identifier = 12;
	public static readonly StringLiteral = 13;
	public static readonly RULE_program = 0;
	public static readonly RULE_sourceElement = 1;
	public static readonly RULE_sourceElements = 2;
	public static readonly RULE_statement = 3;
	public static readonly RULE_eos = 4;
	public static readonly RULE_namedVariable = 5;
	public static readonly RULE_identifier = 6;
	public static readonly RULE_singleExpression = 7;
	public static readonly RULE_assignable = 8;
	public static readonly RULE_variableDeclaration = 9;
	public static readonly RULE_requestStatement = 10;
	public static readonly RULE_requestBuildingStatement = 11;
	public static readonly RULE_urlStatement = 12;
	public static readonly RULE_paramStatement = 13;
	public static readonly RULE_commandStatement = 14;
	public static readonly RULE_logStatement = 15;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "sourceElement", "sourceElements", "statement", "eos", "namedVariable", 
		"identifier", "singleExpression", "assignable", "variableDeclaration", 
		"requestStatement", "requestBuildingStatement", "urlStatement", "paramStatement", 
		"commandStatement", "logStatement",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "'='", "'null'", undefined, undefined, 
		"'GET'", "'POST'", "'url'", "'param'", "'log'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "MultiLineComment", "SingleLineComment", "Assign", "NullLiteral", 
		"BooleanLiteral", "DecimalLiteral", "HTTPGet", "HTTPPost", "Url", "Param", 
		"Log", "Identifier", "StringLiteral",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(BellParser._LITERAL_NAMES, BellParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return BellParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "BellParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return BellParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return BellParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(BellParser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, BellParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 33;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << BellParser.HTTPGet) | (1 << BellParser.HTTPPost) | (1 << BellParser.Url) | (1 << BellParser.Param) | (1 << BellParser.Log))) !== 0)) {
				{
				this.state = 32;
				this.sourceElements();
				}
			}

			this.state = 35;
			this.match(BellParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sourceElement(): SourceElementContext {
		let _localctx: SourceElementContext = new SourceElementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, BellParser.RULE_sourceElement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 37;
			this.statement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sourceElements(): SourceElementsContext {
		let _localctx: SourceElementsContext = new SourceElementsContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, BellParser.RULE_sourceElements);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 40;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 39;
				this.sourceElement();
				}
				}
				this.state = 42;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << BellParser.HTTPGet) | (1 << BellParser.HTTPPost) | (1 << BellParser.Url) | (1 << BellParser.Param) | (1 << BellParser.Log))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, BellParser.RULE_statement);
		try {
			this.state = 47;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BellParser.Url:
			case BellParser.Param:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 44;
				this.requestBuildingStatement();
				}
				break;
			case BellParser.HTTPGet:
			case BellParser.HTTPPost:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 45;
				this.requestStatement();
				}
				break;
			case BellParser.Log:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 46;
				this.commandStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eos(): EosContext {
		let _localctx: EosContext = new EosContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, BellParser.RULE_eos);
		try {
			this.state = 51;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 49;
				this.match(BellParser.EOF);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 50;
				if (!(this.lineTerminatorAhead())) {
					throw this.createFailedPredicateException("this.lineTerminatorAhead()");
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public namedVariable(): NamedVariableContext {
		let _localctx: NamedVariableContext = new NamedVariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, BellParser.RULE_namedVariable);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 53;
			this.match(BellParser.Identifier);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, BellParser.RULE_identifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 55;
			this.namedVariable();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public singleExpression(): SingleExpressionContext {
		let _localctx: SingleExpressionContext = new SingleExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, BellParser.RULE_singleExpression);
		try {
			this.state = 60;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BellParser.Identifier:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 57;
				this.identifier();
				}
				break;
			case BellParser.StringLiteral:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 58;
				this.match(BellParser.StringLiteral);
				}
				break;
			case BellParser.DecimalLiteral:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 59;
				this.match(BellParser.DecimalLiteral);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignable(): AssignableContext {
		let _localctx: AssignableContext = new AssignableContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, BellParser.RULE_assignable);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 62;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableDeclaration(): VariableDeclarationContext {
		let _localctx: VariableDeclarationContext = new VariableDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, BellParser.RULE_variableDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 64;
			this.assignable();
			this.state = 65;
			this.match(BellParser.Assign);
			this.state = 66;
			this.singleExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public requestStatement(): RequestStatementContext {
		let _localctx: RequestStatementContext = new RequestStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, BellParser.RULE_requestStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 68;
			_la = this._input.LA(1);
			if (!(_la === BellParser.HTTPGet || _la === BellParser.HTTPPost)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 69;
			this.eos();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public requestBuildingStatement(): RequestBuildingStatementContext {
		let _localctx: RequestBuildingStatementContext = new RequestBuildingStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, BellParser.RULE_requestBuildingStatement);
		try {
			this.state = 73;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BellParser.Url:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 71;
				this.urlStatement();
				}
				break;
			case BellParser.Param:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 72;
				this.paramStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public urlStatement(): UrlStatementContext {
		let _localctx: UrlStatementContext = new UrlStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, BellParser.RULE_urlStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 75;
			this.match(BellParser.Url);
			this.state = 78;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BellParser.StringLiteral:
				{
				this.state = 76;
				this.match(BellParser.StringLiteral);
				}
				break;
			case BellParser.Identifier:
				{
				this.state = 77;
				this.identifier();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 80;
			this.eos();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paramStatement(): ParamStatementContext {
		let _localctx: ParamStatementContext = new ParamStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, BellParser.RULE_paramStatement);
		try {
			this.state = 94;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				_localctx = new NamedParamStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 82;
				this.match(BellParser.Param);
				this.state = 85;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case BellParser.StringLiteral:
					{
					this.state = 83;
					this.match(BellParser.StringLiteral);
					}
					break;
				case BellParser.Identifier:
					{
					this.state = 84;
					this.identifier();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 87;
				this.singleExpression();
				this.state = 88;
				this.eos();
				}
				break;

			case 2:
				_localctx = new IdentifierParamStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 90;
				this.match(BellParser.Param);
				this.state = 91;
				this.namedVariable();
				this.state = 92;
				this.eos();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public commandStatement(): CommandStatementContext {
		let _localctx: CommandStatementContext = new CommandStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, BellParser.RULE_commandStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 96;
			this.logStatement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public logStatement(): LogStatementContext {
		let _localctx: LogStatementContext = new LogStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, BellParser.RULE_logStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 98;
			this.match(BellParser.Log);
			this.state = 99;
			this.singleExpression();
			this.state = 100;
			this.eos();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 4:
			return this.eos_sempred(_localctx as EosContext, predIndex);
		}
		return true;
	}
	private eos_sempred(_localctx: EosContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.lineTerminatorAhead();
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x0Fi\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x03\x02\x05\x02$" +
		"\n\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x06\x04+\n\x04\r\x04\x0E" +
		"\x04,\x03\x05\x03\x05\x03\x05\x05\x052\n\x05\x03\x06\x03\x06\x05\x066" +
		"\n\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\t\x05\t?\n\t\x03\n" +
		"\x03\n\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\r\x03\r\x05\rL\n" +
		"\r\x03\x0E\x03\x0E\x03\x0E\x05\x0EQ\n\x0E\x03\x0E\x03\x0E\x03\x0F\x03" +
		"\x0F\x03\x0F\x05\x0FX\n\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03" +
		"\x0F\x03\x0F\x05\x0Fa\n\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03" +
		"\x11\x03\x11\x02\x02\x02\x12\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02" +
		"\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02" +
		" \x02\x02\x03\x03\x02\t\n\x02c\x02#\x03\x02\x02\x02\x04\'\x03\x02\x02" +
		"\x02\x06*\x03\x02\x02\x02\b1\x03\x02\x02\x02\n5\x03\x02\x02\x02\f7\x03" +
		"\x02\x02\x02\x0E9\x03\x02\x02\x02\x10>\x03\x02\x02\x02\x12@\x03\x02\x02" +
		"\x02\x14B\x03\x02\x02\x02\x16F\x03\x02\x02\x02\x18K\x03\x02\x02\x02\x1A" +
		"M\x03\x02\x02\x02\x1C`\x03\x02\x02\x02\x1Eb\x03\x02\x02\x02 d\x03\x02" +
		"\x02\x02\"$\x05\x06\x04\x02#\"\x03\x02\x02\x02#$\x03\x02\x02\x02$%\x03" +
		"\x02\x02\x02%&\x07\x02\x02\x03&\x03\x03\x02\x02\x02\'(\x05\b\x05\x02(" +
		"\x05\x03\x02\x02\x02)+\x05\x04\x03\x02*)\x03\x02\x02\x02+,\x03\x02\x02" +
		"\x02,*\x03\x02\x02\x02,-\x03\x02\x02\x02-\x07\x03\x02\x02\x02.2\x05\x18" +
		"\r\x02/2\x05\x16\f\x0202\x05\x1E\x10\x021.\x03\x02\x02\x021/\x03\x02\x02" +
		"\x0210\x03\x02\x02\x022\t\x03\x02\x02\x0236\x07\x02\x02\x0346\x06\x06" +
		"\x02\x0253\x03\x02\x02\x0254\x03\x02\x02\x026\v\x03\x02\x02\x0278\x07" +
		"\x0E\x02\x028\r\x03\x02\x02\x029:\x05\f\x07\x02:\x0F\x03\x02\x02\x02;" +
		"?\x05\x0E\b\x02<?\x07\x0F\x02\x02=?\x07\b\x02\x02>;\x03\x02\x02\x02><" +
		"\x03\x02\x02\x02>=\x03\x02\x02\x02?\x11\x03\x02\x02\x02@A\x05\x0E\b\x02" +
		"A\x13\x03\x02\x02\x02BC\x05\x12\n\x02CD\x07\x05\x02\x02DE\x05\x10\t\x02" +
		"E\x15\x03\x02\x02\x02FG\t\x02\x02\x02GH\x05\n\x06\x02H\x17\x03\x02\x02" +
		"\x02IL\x05\x1A\x0E\x02JL\x05\x1C\x0F\x02KI\x03\x02\x02\x02KJ\x03\x02\x02" +
		"\x02L\x19\x03\x02\x02\x02MP\x07\v\x02\x02NQ\x07\x0F\x02\x02OQ\x05\x0E" +
		"\b\x02PN\x03\x02\x02\x02PO\x03\x02\x02\x02QR\x03\x02\x02\x02RS\x05\n\x06" +
		"\x02S\x1B\x03\x02\x02\x02TW\x07\f\x02\x02UX\x07\x0F\x02\x02VX\x05\x0E" +
		"\b\x02WU\x03\x02\x02\x02WV\x03\x02\x02\x02XY\x03\x02\x02\x02YZ\x05\x10" +
		"\t\x02Z[\x05\n\x06\x02[a\x03\x02\x02\x02\\]\x07\f\x02\x02]^\x05\f\x07" +
		"\x02^_\x05\n\x06\x02_a\x03\x02\x02\x02`T\x03\x02\x02\x02`\\\x03\x02\x02" +
		"\x02a\x1D\x03\x02\x02\x02bc\x05 \x11\x02c\x1F\x03\x02\x02\x02de\x07\r" +
		"\x02\x02ef\x05\x10\t\x02fg\x05\n\x06\x02g!\x03\x02\x02\x02\v#,15>KPW`";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!BellParser.__ATN) {
			BellParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(BellParser._serializedATN));
		}

		return BellParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(BellParser.EOF, 0); }
	public sourceElements(): SourceElementsContext | undefined {
		return this.tryGetRuleContext(0, SourceElementsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_program; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SourceElementContext extends ParserRuleContext {
	public statement(): StatementContext {
		return this.getRuleContext(0, StatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_sourceElement; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterSourceElement) {
			listener.enterSourceElement(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitSourceElement) {
			listener.exitSourceElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitSourceElement) {
			return visitor.visitSourceElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SourceElementsContext extends ParserRuleContext {
	public sourceElement(): SourceElementContext[];
	public sourceElement(i: number): SourceElementContext;
	public sourceElement(i?: number): SourceElementContext | SourceElementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SourceElementContext);
		} else {
			return this.getRuleContext(i, SourceElementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_sourceElements; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterSourceElements) {
			listener.enterSourceElements(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitSourceElements) {
			listener.exitSourceElements(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitSourceElements) {
			return visitor.visitSourceElements(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public requestBuildingStatement(): RequestBuildingStatementContext | undefined {
		return this.tryGetRuleContext(0, RequestBuildingStatementContext);
	}
	public requestStatement(): RequestStatementContext | undefined {
		return this.tryGetRuleContext(0, RequestStatementContext);
	}
	public commandStatement(): CommandStatementContext | undefined {
		return this.tryGetRuleContext(0, CommandStatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_statement; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EosContext extends ParserRuleContext {
	public EOF(): TerminalNode | undefined { return this.tryGetToken(BellParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_eos; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterEos) {
			listener.enterEos(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitEos) {
			listener.exitEos(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitEos) {
			return visitor.visitEos(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NamedVariableContext extends ParserRuleContext {
	public Identifier(): TerminalNode { return this.getToken(BellParser.Identifier, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_namedVariable; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterNamedVariable) {
			listener.enterNamedVariable(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitNamedVariable) {
			listener.exitNamedVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitNamedVariable) {
			return visitor.visitNamedVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public namedVariable(): NamedVariableContext {
		return this.getRuleContext(0, NamedVariableContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_identifier; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterIdentifier) {
			listener.enterIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitIdentifier) {
			listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SingleExpressionContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public StringLiteral(): TerminalNode | undefined { return this.tryGetToken(BellParser.StringLiteral, 0); }
	public DecimalLiteral(): TerminalNode | undefined { return this.tryGetToken(BellParser.DecimalLiteral, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_singleExpression; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterSingleExpression) {
			listener.enterSingleExpression(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitSingleExpression) {
			listener.exitSingleExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitSingleExpression) {
			return visitor.visitSingleExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignableContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_assignable; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterAssignable) {
			listener.enterAssignable(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitAssignable) {
			listener.exitAssignable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitAssignable) {
			return visitor.visitAssignable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableDeclarationContext extends ParserRuleContext {
	public assignable(): AssignableContext {
		return this.getRuleContext(0, AssignableContext);
	}
	public Assign(): TerminalNode { return this.getToken(BellParser.Assign, 0); }
	public singleExpression(): SingleExpressionContext {
		return this.getRuleContext(0, SingleExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_variableDeclaration; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterVariableDeclaration) {
			listener.enterVariableDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitVariableDeclaration) {
			listener.exitVariableDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitVariableDeclaration) {
			return visitor.visitVariableDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RequestStatementContext extends ParserRuleContext {
	public eos(): EosContext {
		return this.getRuleContext(0, EosContext);
	}
	public HTTPGet(): TerminalNode | undefined { return this.tryGetToken(BellParser.HTTPGet, 0); }
	public HTTPPost(): TerminalNode | undefined { return this.tryGetToken(BellParser.HTTPPost, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_requestStatement; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterRequestStatement) {
			listener.enterRequestStatement(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitRequestStatement) {
			listener.exitRequestStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitRequestStatement) {
			return visitor.visitRequestStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RequestBuildingStatementContext extends ParserRuleContext {
	public urlStatement(): UrlStatementContext | undefined {
		return this.tryGetRuleContext(0, UrlStatementContext);
	}
	public paramStatement(): ParamStatementContext | undefined {
		return this.tryGetRuleContext(0, ParamStatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_requestBuildingStatement; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterRequestBuildingStatement) {
			listener.enterRequestBuildingStatement(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitRequestBuildingStatement) {
			listener.exitRequestBuildingStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitRequestBuildingStatement) {
			return visitor.visitRequestBuildingStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UrlStatementContext extends ParserRuleContext {
	public Url(): TerminalNode { return this.getToken(BellParser.Url, 0); }
	public eos(): EosContext {
		return this.getRuleContext(0, EosContext);
	}
	public StringLiteral(): TerminalNode | undefined { return this.tryGetToken(BellParser.StringLiteral, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_urlStatement; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterUrlStatement) {
			listener.enterUrlStatement(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitUrlStatement) {
			listener.exitUrlStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitUrlStatement) {
			return visitor.visitUrlStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamStatementContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_paramStatement; }
	public copyFrom(ctx: ParamStatementContext): void {
		super.copyFrom(ctx);
	}
}
export class NamedParamStatementContext extends ParamStatementContext {
	public Param(): TerminalNode { return this.getToken(BellParser.Param, 0); }
	public singleExpression(): SingleExpressionContext {
		return this.getRuleContext(0, SingleExpressionContext);
	}
	public eos(): EosContext {
		return this.getRuleContext(0, EosContext);
	}
	public StringLiteral(): TerminalNode | undefined { return this.tryGetToken(BellParser.StringLiteral, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(ctx: ParamStatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterNamedParamStatement) {
			listener.enterNamedParamStatement(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitNamedParamStatement) {
			listener.exitNamedParamStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitNamedParamStatement) {
			return visitor.visitNamedParamStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IdentifierParamStatementContext extends ParamStatementContext {
	public Param(): TerminalNode { return this.getToken(BellParser.Param, 0); }
	public namedVariable(): NamedVariableContext {
		return this.getRuleContext(0, NamedVariableContext);
	}
	public eos(): EosContext {
		return this.getRuleContext(0, EosContext);
	}
	constructor(ctx: ParamStatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterIdentifierParamStatement) {
			listener.enterIdentifierParamStatement(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitIdentifierParamStatement) {
			listener.exitIdentifierParamStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitIdentifierParamStatement) {
			return visitor.visitIdentifierParamStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommandStatementContext extends ParserRuleContext {
	public logStatement(): LogStatementContext {
		return this.getRuleContext(0, LogStatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_commandStatement; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterCommandStatement) {
			listener.enterCommandStatement(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitCommandStatement) {
			listener.exitCommandStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitCommandStatement) {
			return visitor.visitCommandStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogStatementContext extends ParserRuleContext {
	public Log(): TerminalNode { return this.getToken(BellParser.Log, 0); }
	public singleExpression(): SingleExpressionContext {
		return this.getRuleContext(0, SingleExpressionContext);
	}
	public eos(): EosContext {
		return this.getRuleContext(0, EosContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_logStatement; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterLogStatement) {
			listener.enterLogStatement(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitLogStatement) {
			listener.exitLogStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitLogStatement) {
			return visitor.visitLogStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


