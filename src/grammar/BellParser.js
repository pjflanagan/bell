// Generated from ./src/grammar/BellParser.g4 by ANTLR 4.13.2
// jshint ignore: start
import antlr4 from 'antlr4';
import BellParserListener from './BellParserListener.js';
const serializedATN = [4,1,13,86,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,
2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,
13,7,13,1,0,3,0,30,8,0,1,0,1,0,1,1,1,1,1,2,4,2,37,8,2,11,2,12,2,38,1,3,1,
3,1,3,3,3,44,8,3,1,4,1,4,3,4,48,8,4,1,5,1,5,1,6,1,6,3,6,54,8,6,1,7,1,7,1,
7,1,8,1,8,1,8,1,9,1,9,3,9,64,8,9,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,
1,11,1,11,1,11,1,11,3,11,78,8,11,1,12,1,12,1,13,1,13,1,13,1,13,1,13,0,0,
14,0,2,4,6,8,10,12,14,16,18,20,22,24,26,0,2,2,0,6,6,12,13,1,0,12,13,79,0,
29,1,0,0,0,2,33,1,0,0,0,4,36,1,0,0,0,6,43,1,0,0,0,8,47,1,0,0,0,10,49,1,0,
0,0,12,53,1,0,0,0,14,55,1,0,0,0,16,58,1,0,0,0,18,63,1,0,0,0,20,65,1,0,0,
0,22,77,1,0,0,0,24,79,1,0,0,0,26,81,1,0,0,0,28,30,3,4,2,0,29,28,1,0,0,0,
29,30,1,0,0,0,30,31,1,0,0,0,31,32,5,0,0,1,32,1,1,0,0,0,33,34,3,6,3,0,34,
3,1,0,0,0,35,37,3,2,1,0,36,35,1,0,0,0,37,38,1,0,0,0,38,36,1,0,0,0,38,39,
1,0,0,0,39,5,1,0,0,0,40,44,3,18,9,0,41,44,3,12,6,0,42,44,3,24,12,0,43,40,
1,0,0,0,43,41,1,0,0,0,43,42,1,0,0,0,44,7,1,0,0,0,45,48,5,0,0,1,46,48,4,4,
0,0,47,45,1,0,0,0,47,46,1,0,0,0,48,9,1,0,0,0,49,50,7,0,0,0,50,11,1,0,0,0,
51,54,3,14,7,0,52,54,3,16,8,0,53,51,1,0,0,0,53,52,1,0,0,0,54,13,1,0,0,0,
55,56,5,7,0,0,56,57,3,8,4,0,57,15,1,0,0,0,58,59,5,8,0,0,59,60,3,8,4,0,60,
17,1,0,0,0,61,64,3,20,10,0,62,64,3,22,11,0,63,61,1,0,0,0,63,62,1,0,0,0,64,
19,1,0,0,0,65,66,5,9,0,0,66,67,5,13,0,0,67,68,3,8,4,0,68,21,1,0,0,0,69,70,
5,10,0,0,70,71,7,1,0,0,71,72,3,10,5,0,72,73,3,8,4,0,73,78,1,0,0,0,74,75,
5,10,0,0,75,76,5,12,0,0,76,78,3,8,4,0,77,69,1,0,0,0,77,74,1,0,0,0,78,23,
1,0,0,0,79,80,3,26,13,0,80,25,1,0,0,0,81,82,5,11,0,0,82,83,3,10,5,0,83,84,
3,8,4,0,84,27,1,0,0,0,7,29,38,43,47,53,63,77];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class BellParser extends antlr4.Parser {

    static grammarFileName = "BellParser.g4";
    static literalNames = [ null, null, null, "'='", "'null'", null, null, 
                            "'GET'", "'POST'", "'url'", "'param'", "'log'" ];
    static symbolicNames = [ null, "MultiLineComment", "SingleLineComment", 
                             "Assign", "NullLiteral", "BooleanLiteral", 
                             "DecimalLiteral", "HTTPGet", "HTTPPost", "Url", 
                             "Param", "Log", "Identifier", "StringLiteral" ];
    static ruleNames = [ "program", "sourceElement", "sourceElements", "statement", 
                         "eos", "singleExpression", "requestStatement", 
                         "getStatement", "postStatement", "requestBuildingStatement", 
                         "urlStatement", "paramStatement", "commandStatement", 
                         "logStatement" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = BellParser.ruleNames;
        this.literalNames = BellParser.literalNames;
        this.symbolicNames = BellParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 4:
    	    		return this.eos_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    eos_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.lineTerminatorAhead();
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	program() {
	    let localctx = new ProgramContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, BellParser.RULE_program);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 29;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 3968) !== 0)) {
	            this.state = 28;
	            this.sourceElements();
	        }

	        this.state = 31;
	        this.match(BellParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	sourceElement() {
	    let localctx = new SourceElementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, BellParser.RULE_sourceElement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 33;
	        this.statement();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	sourceElements() {
	    let localctx = new SourceElementsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, BellParser.RULE_sourceElements);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 36; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 35;
	            this.sourceElement();
	            this.state = 38; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) === 0 && ((1 << _la) & 3968) !== 0));
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	statement() {
	    let localctx = new StatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, BellParser.RULE_statement);
	    try {
	        this.state = 43;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 9:
	        case 10:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 40;
	            this.requestBuildingStatement();
	            break;
	        case 7:
	        case 8:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 41;
	            this.requestStatement();
	            break;
	        case 11:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 42;
	            this.commandStatement();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	eos() {
	    let localctx = new EosContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, BellParser.RULE_eos);
	    try {
	        this.state = 47;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 45;
	            this.match(BellParser.EOF);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 46;
	            if (!( this.lineTerminatorAhead())) {
	                throw new antlr4.error.FailedPredicateException(this, "this.lineTerminatorAhead()");
	            }
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	singleExpression() {
	    let localctx = new SingleExpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, BellParser.RULE_singleExpression);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 49;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 12352) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	requestStatement() {
	    let localctx = new RequestStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, BellParser.RULE_requestStatement);
	    try {
	        this.state = 53;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 7:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 51;
	            this.getStatement();
	            break;
	        case 8:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 52;
	            this.postStatement();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	getStatement() {
	    let localctx = new GetStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, BellParser.RULE_getStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 55;
	        this.match(BellParser.HTTPGet);
	        this.state = 56;
	        this.eos();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	postStatement() {
	    let localctx = new PostStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, BellParser.RULE_postStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 58;
	        this.match(BellParser.HTTPPost);
	        this.state = 59;
	        this.eos();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	requestBuildingStatement() {
	    let localctx = new RequestBuildingStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, BellParser.RULE_requestBuildingStatement);
	    try {
	        this.state = 63;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 9:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 61;
	            this.urlStatement();
	            break;
	        case 10:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 62;
	            this.paramStatement();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	urlStatement() {
	    let localctx = new UrlStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, BellParser.RULE_urlStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 65;
	        this.match(BellParser.Url);
	        this.state = 66;
	        this.match(BellParser.StringLiteral);
	        this.state = 67;
	        this.eos();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	paramStatement() {
	    let localctx = new ParamStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, BellParser.RULE_paramStatement);
	    var _la = 0;
	    try {
	        this.state = 77;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new NamedParamStatementContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 69;
	            this.match(BellParser.Param);
	            this.state = 70;
	            _la = this._input.LA(1);
	            if(!(_la===12 || _la===13)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 71;
	            this.singleExpression();
	            this.state = 72;
	            this.eos();
	            break;

	        case 2:
	            localctx = new IdentifierParamStatementContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 74;
	            this.match(BellParser.Param);
	            this.state = 75;
	            this.match(BellParser.Identifier);
	            this.state = 76;
	            this.eos();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	commandStatement() {
	    let localctx = new CommandStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, BellParser.RULE_commandStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 79;
	        this.logStatement();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	logStatement() {
	    let localctx = new LogStatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, BellParser.RULE_logStatement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 81;
	        this.match(BellParser.Log);
	        this.state = 82;
	        this.singleExpression();
	        this.state = 83;
	        this.eos();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

BellParser.EOF = antlr4.Token.EOF;
BellParser.MultiLineComment = 1;
BellParser.SingleLineComment = 2;
BellParser.Assign = 3;
BellParser.NullLiteral = 4;
BellParser.BooleanLiteral = 5;
BellParser.DecimalLiteral = 6;
BellParser.HTTPGet = 7;
BellParser.HTTPPost = 8;
BellParser.Url = 9;
BellParser.Param = 10;
BellParser.Log = 11;
BellParser.Identifier = 12;
BellParser.StringLiteral = 13;

BellParser.RULE_program = 0;
BellParser.RULE_sourceElement = 1;
BellParser.RULE_sourceElements = 2;
BellParser.RULE_statement = 3;
BellParser.RULE_eos = 4;
BellParser.RULE_singleExpression = 5;
BellParser.RULE_requestStatement = 6;
BellParser.RULE_getStatement = 7;
BellParser.RULE_postStatement = 8;
BellParser.RULE_requestBuildingStatement = 9;
BellParser.RULE_urlStatement = 10;
BellParser.RULE_paramStatement = 11;
BellParser.RULE_commandStatement = 12;
BellParser.RULE_logStatement = 13;

class ProgramContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_program;
    }

	EOF() {
	    return this.getToken(BellParser.EOF, 0);
	};

	sourceElements() {
	    return this.getTypedRuleContext(SourceElementsContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterProgram(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitProgram(this);
		}
	}


}



class SourceElementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_sourceElement;
    }

	statement() {
	    return this.getTypedRuleContext(StatementContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterSourceElement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitSourceElement(this);
		}
	}


}



class SourceElementsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_sourceElements;
    }

	sourceElement = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(SourceElementContext);
	    } else {
	        return this.getTypedRuleContext(SourceElementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterSourceElements(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitSourceElements(this);
		}
	}


}



class StatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_statement;
    }

	requestBuildingStatement() {
	    return this.getTypedRuleContext(RequestBuildingStatementContext,0);
	};

	requestStatement() {
	    return this.getTypedRuleContext(RequestStatementContext,0);
	};

	commandStatement() {
	    return this.getTypedRuleContext(CommandStatementContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitStatement(this);
		}
	}


}



class EosContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_eos;
    }

	EOF() {
	    return this.getToken(BellParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterEos(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitEos(this);
		}
	}


}



class SingleExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_singleExpression;
    }

	StringLiteral() {
	    return this.getToken(BellParser.StringLiteral, 0);
	};

	Identifier() {
	    return this.getToken(BellParser.Identifier, 0);
	};

	DecimalLiteral() {
	    return this.getToken(BellParser.DecimalLiteral, 0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterSingleExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitSingleExpression(this);
		}
	}


}



class RequestStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_requestStatement;
    }

	getStatement() {
	    return this.getTypedRuleContext(GetStatementContext,0);
	};

	postStatement() {
	    return this.getTypedRuleContext(PostStatementContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterRequestStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitRequestStatement(this);
		}
	}


}



class GetStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_getStatement;
    }

	HTTPGet() {
	    return this.getToken(BellParser.HTTPGet, 0);
	};

	eos() {
	    return this.getTypedRuleContext(EosContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterGetStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitGetStatement(this);
		}
	}


}



class PostStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_postStatement;
    }

	HTTPPost() {
	    return this.getToken(BellParser.HTTPPost, 0);
	};

	eos() {
	    return this.getTypedRuleContext(EosContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterPostStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitPostStatement(this);
		}
	}


}



class RequestBuildingStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_requestBuildingStatement;
    }

	urlStatement() {
	    return this.getTypedRuleContext(UrlStatementContext,0);
	};

	paramStatement() {
	    return this.getTypedRuleContext(ParamStatementContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterRequestBuildingStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitRequestBuildingStatement(this);
		}
	}


}



class UrlStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_urlStatement;
    }

	Url() {
	    return this.getToken(BellParser.Url, 0);
	};

	StringLiteral() {
	    return this.getToken(BellParser.StringLiteral, 0);
	};

	eos() {
	    return this.getTypedRuleContext(EosContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterUrlStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitUrlStatement(this);
		}
	}


}



class ParamStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_paramStatement;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class IdentifierParamStatementContext extends ParamStatementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	Param() {
	    return this.getToken(BellParser.Param, 0);
	};

	Identifier() {
	    return this.getToken(BellParser.Identifier, 0);
	};

	eos() {
	    return this.getTypedRuleContext(EosContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterIdentifierParamStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitIdentifierParamStatement(this);
		}
	}


}

BellParser.IdentifierParamStatementContext = IdentifierParamStatementContext;

class NamedParamStatementContext extends ParamStatementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	Param() {
	    return this.getToken(BellParser.Param, 0);
	};

	singleExpression() {
	    return this.getTypedRuleContext(SingleExpressionContext,0);
	};

	eos() {
	    return this.getTypedRuleContext(EosContext,0);
	};

	StringLiteral() {
	    return this.getToken(BellParser.StringLiteral, 0);
	};

	Identifier() {
	    return this.getToken(BellParser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterNamedParamStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitNamedParamStatement(this);
		}
	}


}

BellParser.NamedParamStatementContext = NamedParamStatementContext;

class CommandStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_commandStatement;
    }

	logStatement() {
	    return this.getTypedRuleContext(LogStatementContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterCommandStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitCommandStatement(this);
		}
	}


}



class LogStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = BellParser.RULE_logStatement;
    }

	Log() {
	    return this.getToken(BellParser.Log, 0);
	};

	singleExpression() {
	    return this.getTypedRuleContext(SingleExpressionContext,0);
	};

	eos() {
	    return this.getTypedRuleContext(EosContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.enterLogStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof BellParserListener ) {
	        listener.exitLogStatement(this);
		}
	}


}




BellParser.ProgramContext = ProgramContext; 
BellParser.SourceElementContext = SourceElementContext; 
BellParser.SourceElementsContext = SourceElementsContext; 
BellParser.StatementContext = StatementContext; 
BellParser.EosContext = EosContext; 
BellParser.SingleExpressionContext = SingleExpressionContext; 
BellParser.RequestStatementContext = RequestStatementContext; 
BellParser.GetStatementContext = GetStatementContext; 
BellParser.PostStatementContext = PostStatementContext; 
BellParser.RequestBuildingStatementContext = RequestBuildingStatementContext; 
BellParser.UrlStatementContext = UrlStatementContext; 
BellParser.ParamStatementContext = ParamStatementContext; 
BellParser.CommandStatementContext = CommandStatementContext; 
BellParser.LogStatementContext = LogStatementContext; 
