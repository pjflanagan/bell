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
	public static readonly RULE_singleExpression = 5;
	public static readonly RULE_requestStatement = 6;
	public static readonly RULE_getStatement = 7;
	public static readonly RULE_postStatement = 8;
	public static readonly RULE_requestBuildingStatement = 9;
	public static readonly RULE_urlStatement = 10;
	public static readonly RULE_paramStatement = 11;
	public static readonly RULE_commandStatement = 12;
	public static readonly RULE_logStatement = 13;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "sourceElement", "sourceElements", "statement", "eos", "singleExpression", 
		"requestStatement", "getStatement", "postStatement", "requestBuildingStatement", 
		"urlStatement", "paramStatement", "commandStatement", "logStatement",
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
			this.state = 29;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << BellParser.HTTPGet) | (1 << BellParser.HTTPPost) | (1 << BellParser.Url) | (1 << BellParser.Param) | (1 << BellParser.Log))) !== 0)) {
				{
				this.state = 28;
				this.sourceElements();
				}
			}

			this.state = 31;
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
			this.state = 33;
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
			this.state = 36;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 35;
				this.sourceElement();
				}
				}
				this.state = 38;
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
			this.state = 43;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BellParser.Url:
			case BellParser.Param:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 40;
				this.requestBuildingStatement();
				}
				break;
			case BellParser.HTTPGet:
			case BellParser.HTTPPost:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 41;
				this.requestStatement();
				}
				break;
			case BellParser.Log:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 42;
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
			this.state = 47;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 45;
				this.match(BellParser.EOF);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 46;
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
	public singleExpression(): SingleExpressionContext {
		let _localctx: SingleExpressionContext = new SingleExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, BellParser.RULE_singleExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 49;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << BellParser.DecimalLiteral) | (1 << BellParser.Identifier) | (1 << BellParser.StringLiteral))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
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
		this.enterRule(_localctx, 12, BellParser.RULE_requestStatement);
		try {
			this.state = 53;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BellParser.HTTPGet:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 51;
				this.getStatement();
				}
				break;
			case BellParser.HTTPPost:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 52;
				this.postStatement();
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
	public getStatement(): GetStatementContext {
		let _localctx: GetStatementContext = new GetStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, BellParser.RULE_getStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 55;
			this.match(BellParser.HTTPGet);
			this.state = 56;
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
	public postStatement(): PostStatementContext {
		let _localctx: PostStatementContext = new PostStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, BellParser.RULE_postStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 58;
			this.match(BellParser.HTTPPost);
			this.state = 59;
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
		this.enterRule(_localctx, 18, BellParser.RULE_requestBuildingStatement);
		try {
			this.state = 63;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BellParser.Url:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 61;
				this.urlStatement();
				}
				break;
			case BellParser.Param:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 62;
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
		this.enterRule(_localctx, 20, BellParser.RULE_urlStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 65;
			this.match(BellParser.Url);
			this.state = 66;
			this.match(BellParser.StringLiteral);
			this.state = 67;
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
		this.enterRule(_localctx, 22, BellParser.RULE_paramStatement);
		let _la: number;
		try {
			this.state = 77;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				_localctx = new NamedParamStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 69;
				this.match(BellParser.Param);
				this.state = 70;
				_la = this._input.LA(1);
				if (!(_la === BellParser.Identifier || _la === BellParser.StringLiteral)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 71;
				this.singleExpression();
				this.state = 72;
				this.eos();
				}
				break;

			case 2:
				_localctx = new IdentifierParamStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 74;
				this.match(BellParser.Param);
				this.state = 75;
				this.match(BellParser.Identifier);
				this.state = 76;
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
		this.enterRule(_localctx, 24, BellParser.RULE_commandStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 79;
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
		this.enterRule(_localctx, 26, BellParser.RULE_logStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 81;
			this.match(BellParser.Log);
			this.state = 82;
			this.singleExpression();
			this.state = 83;
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x0FX\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x03\x02\x05\x02 \n\x02\x03\x02\x03\x02\x03\x03" +
		"\x03\x03\x03\x04\x06\x04\'\n\x04\r\x04\x0E\x04(\x03\x05\x03\x05\x03\x05" +
		"\x05\x05.\n\x05\x03\x06\x03\x06\x05\x062\n\x06\x03\x07\x03\x07\x03\b\x03" +
		"\b\x05\b8\n\b\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\v\x03\v\x05\vB\n" +
		"\v\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
		"\r\x05\rP\n\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F" +
		"\x02\x02\x02\x10\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10" +
		"\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x02\x04\x04\x02\b" +
		"\b\x0E\x0F\x03\x02\x0E\x0F\x02Q\x02\x1F\x03\x02\x02\x02\x04#\x03\x02\x02" +
		"\x02\x06&\x03\x02\x02\x02\b-\x03\x02\x02\x02\n1\x03\x02\x02\x02\f3\x03" +
		"\x02\x02\x02\x0E7\x03\x02\x02\x02\x109\x03\x02\x02\x02\x12<\x03\x02\x02" +
		"\x02\x14A\x03\x02\x02\x02\x16C\x03\x02\x02\x02\x18O\x03\x02\x02\x02\x1A" +
		"Q\x03\x02\x02\x02\x1CS\x03\x02\x02\x02\x1E \x05\x06\x04\x02\x1F\x1E\x03" +
		"\x02\x02\x02\x1F \x03\x02\x02\x02 !\x03\x02\x02\x02!\"\x07\x02\x02\x03" +
		"\"\x03\x03\x02\x02\x02#$\x05\b\x05\x02$\x05\x03\x02\x02\x02%\'\x05\x04" +
		"\x03\x02&%\x03\x02\x02\x02\'(\x03\x02\x02\x02(&\x03\x02\x02\x02()\x03" +
		"\x02\x02\x02)\x07\x03\x02\x02\x02*.\x05\x14\v\x02+.\x05\x0E\b\x02,.\x05" +
		"\x1A\x0E\x02-*\x03\x02\x02\x02-+\x03\x02\x02\x02-,\x03\x02\x02\x02.\t" +
		"\x03\x02\x02\x02/2\x07\x02\x02\x0302\x06\x06\x02\x021/\x03\x02\x02\x02" +
		"10\x03\x02\x02\x022\v\x03\x02\x02\x0234\t\x02\x02\x024\r\x03\x02\x02\x02" +
		"58\x05\x10\t\x0268\x05\x12\n\x0275\x03\x02\x02\x0276\x03\x02\x02\x028" +
		"\x0F\x03\x02\x02\x029:\x07\t\x02\x02:;\x05\n\x06\x02;\x11\x03\x02\x02" +
		"\x02<=\x07\n\x02\x02=>\x05\n\x06\x02>\x13\x03\x02\x02\x02?B\x05\x16\f" +
		"\x02@B\x05\x18\r\x02A?\x03\x02\x02\x02A@\x03\x02\x02\x02B\x15\x03\x02" +
		"\x02\x02CD\x07\v\x02\x02DE\x07\x0F\x02\x02EF\x05\n\x06\x02F\x17\x03\x02" +
		"\x02\x02GH\x07\f\x02\x02HI\t\x03\x02\x02IJ\x05\f\x07\x02JK\x05\n\x06\x02" +
		"KP\x03\x02\x02\x02LM\x07\f\x02\x02MN\x07\x0E\x02\x02NP\x05\n\x06\x02O" +
		"G\x03\x02\x02\x02OL\x03\x02\x02\x02P\x19\x03\x02\x02\x02QR\x05\x1C\x0F" +
		"\x02R\x1B\x03\x02\x02\x02ST\x07\r\x02\x02TU\x05\f\x07\x02UV\x05\n\x06" +
		"\x02V\x1D\x03\x02\x02\x02\t\x1F(-17AO";
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


export class SingleExpressionContext extends ParserRuleContext {
	public StringLiteral(): TerminalNode | undefined { return this.tryGetToken(BellParser.StringLiteral, 0); }
	public Identifier(): TerminalNode | undefined { return this.tryGetToken(BellParser.Identifier, 0); }
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


export class RequestStatementContext extends ParserRuleContext {
	public getStatement(): GetStatementContext | undefined {
		return this.tryGetRuleContext(0, GetStatementContext);
	}
	public postStatement(): PostStatementContext | undefined {
		return this.tryGetRuleContext(0, PostStatementContext);
	}
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


export class GetStatementContext extends ParserRuleContext {
	public HTTPGet(): TerminalNode { return this.getToken(BellParser.HTTPGet, 0); }
	public eos(): EosContext {
		return this.getRuleContext(0, EosContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_getStatement; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterGetStatement) {
			listener.enterGetStatement(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitGetStatement) {
			listener.exitGetStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitGetStatement) {
			return visitor.visitGetStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PostStatementContext extends ParserRuleContext {
	public HTTPPost(): TerminalNode { return this.getToken(BellParser.HTTPPost, 0); }
	public eos(): EosContext {
		return this.getRuleContext(0, EosContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BellParser.RULE_postStatement; }
	// @Override
	public enterRule(listener: BellParserListener): void {
		if (listener.enterPostStatement) {
			listener.enterPostStatement(this);
		}
	}
	// @Override
	public exitRule(listener: BellParserListener): void {
		if (listener.exitPostStatement) {
			listener.exitPostStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BellParserVisitor<Result>): Result {
		if (visitor.visitPostStatement) {
			return visitor.visitPostStatement(this);
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
	public StringLiteral(): TerminalNode { return this.getToken(BellParser.StringLiteral, 0); }
	public eos(): EosContext {
		return this.getRuleContext(0, EosContext);
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
	public Identifier(): TerminalNode | undefined { return this.tryGetToken(BellParser.Identifier, 0); }
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
	public Identifier(): TerminalNode { return this.getToken(BellParser.Identifier, 0); }
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


