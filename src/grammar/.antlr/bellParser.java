// Generated from /Users/pflanagan/peter/bell/src/grammar/bell.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class bellParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, ID=6, NUMBER=7, WS=8, URL=9;
	public static final int
		RULE_program = 0, RULE_sourceElement = 1, RULE_sourceElements = 2, RULE_statement = 3, 
		RULE_eos = 4, RULE_requestStatement = 5, RULE_getStatement = 6, RULE_postStatement = 7, 
		RULE_requestBuildingStatement = 8, RULE_urlStatement = 9, RULE_paramStatement = 10, 
		RULE_commandStatement = 11, RULE_logStatement = 12;
	private static String[] makeRuleNames() {
		return new String[] {
			"program", "sourceElement", "sourceElements", "statement", "eos", "requestStatement", 
			"getStatement", "postStatement", "requestBuildingStatement", "urlStatement", 
			"paramStatement", "commandStatement", "logStatement"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'GET'", "'POST'", "'url'", "'param'", "'log'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, "ID", "NUMBER", "WS", "URL"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "bell.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public bellParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ProgramContext extends ParserRuleContext {
		public TerminalNode EOF() { return getToken(bellParser.EOF, 0); }
		public SourceElementsContext sourceElements() {
			return getRuleContext(SourceElementsContext.class,0);
		}
		public ProgramContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_program; }
	}

	public final ProgramContext program() throws RecognitionException {
		ProgramContext _localctx = new ProgramContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_program);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(27);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 62L) != 0)) {
				{
				setState(26);
				sourceElements();
				}
			}

			setState(29);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SourceElementContext extends ParserRuleContext {
		public StatementContext statement() {
			return getRuleContext(StatementContext.class,0);
		}
		public SourceElementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sourceElement; }
	}

	public final SourceElementContext sourceElement() throws RecognitionException {
		SourceElementContext _localctx = new SourceElementContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_sourceElement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(31);
			statement();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SourceElementsContext extends ParserRuleContext {
		public List<SourceElementContext> sourceElement() {
			return getRuleContexts(SourceElementContext.class);
		}
		public SourceElementContext sourceElement(int i) {
			return getRuleContext(SourceElementContext.class,i);
		}
		public SourceElementsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sourceElements; }
	}

	public final SourceElementsContext sourceElements() throws RecognitionException {
		SourceElementsContext _localctx = new SourceElementsContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_sourceElements);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(34); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(33);
				sourceElement();
				}
				}
				setState(36); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 62L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class StatementContext extends ParserRuleContext {
		public RequestBuildingStatementContext requestBuildingStatement() {
			return getRuleContext(RequestBuildingStatementContext.class,0);
		}
		public RequestStatementContext requestStatement() {
			return getRuleContext(RequestStatementContext.class,0);
		}
		public CommandStatementContext commandStatement() {
			return getRuleContext(CommandStatementContext.class,0);
		}
		public StatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statement; }
	}

	public final StatementContext statement() throws RecognitionException {
		StatementContext _localctx = new StatementContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_statement);
		try {
			setState(41);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__2:
			case T__3:
				enterOuterAlt(_localctx, 1);
				{
				setState(38);
				requestBuildingStatement();
				}
				break;
			case T__0:
			case T__1:
				enterOuterAlt(_localctx, 2);
				{
				setState(39);
				requestStatement();
				}
				break;
			case T__4:
				enterOuterAlt(_localctx, 3);
				{
				setState(40);
				commandStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EosContext extends ParserRuleContext {
		public TerminalNode EOF() { return getToken(bellParser.EOF, 0); }
		public EosContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_eos; }
	}

	public final EosContext eos() throws RecognitionException {
		EosContext _localctx = new EosContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_eos);
		try {
			setState(45);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(43);
				match(EOF);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(44);
				if (!(this.lineTerminatorAhead())) throw new FailedPredicateException(this, "this.lineTerminatorAhead()");
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RequestStatementContext extends ParserRuleContext {
		public GetStatementContext getStatement() {
			return getRuleContext(GetStatementContext.class,0);
		}
		public PostStatementContext postStatement() {
			return getRuleContext(PostStatementContext.class,0);
		}
		public RequestStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_requestStatement; }
	}

	public final RequestStatementContext requestStatement() throws RecognitionException {
		RequestStatementContext _localctx = new RequestStatementContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_requestStatement);
		try {
			setState(49);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__0:
				enterOuterAlt(_localctx, 1);
				{
				setState(47);
				getStatement();
				}
				break;
			case T__1:
				enterOuterAlt(_localctx, 2);
				{
				setState(48);
				postStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class GetStatementContext extends ParserRuleContext {
		public EosContext eos() {
			return getRuleContext(EosContext.class,0);
		}
		public GetStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_getStatement; }
	}

	public final GetStatementContext getStatement() throws RecognitionException {
		GetStatementContext _localctx = new GetStatementContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_getStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(51);
			match(T__0);
			setState(52);
			eos();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PostStatementContext extends ParserRuleContext {
		public EosContext eos() {
			return getRuleContext(EosContext.class,0);
		}
		public PostStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_postStatement; }
	}

	public final PostStatementContext postStatement() throws RecognitionException {
		PostStatementContext _localctx = new PostStatementContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_postStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(54);
			match(T__1);
			setState(55);
			eos();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RequestBuildingStatementContext extends ParserRuleContext {
		public UrlStatementContext urlStatement() {
			return getRuleContext(UrlStatementContext.class,0);
		}
		public ParamStatementContext paramStatement() {
			return getRuleContext(ParamStatementContext.class,0);
		}
		public RequestBuildingStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_requestBuildingStatement; }
	}

	public final RequestBuildingStatementContext requestBuildingStatement() throws RecognitionException {
		RequestBuildingStatementContext _localctx = new RequestBuildingStatementContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_requestBuildingStatement);
		try {
			setState(59);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__2:
				enterOuterAlt(_localctx, 1);
				{
				setState(57);
				urlStatement();
				}
				break;
			case T__3:
				enterOuterAlt(_localctx, 2);
				{
				setState(58);
				paramStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class UrlStatementContext extends ParserRuleContext {
		public TerminalNode URL() { return getToken(bellParser.URL, 0); }
		public EosContext eos() {
			return getRuleContext(EosContext.class,0);
		}
		public UrlStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_urlStatement; }
	}

	public final UrlStatementContext urlStatement() throws RecognitionException {
		UrlStatementContext _localctx = new UrlStatementContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_urlStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(61);
			match(T__2);
			setState(62);
			match(URL);
			setState(63);
			eos();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ParamStatementContext extends ParserRuleContext {
		public TerminalNode ID() { return getToken(bellParser.ID, 0); }
		public TerminalNode NUMBER() { return getToken(bellParser.NUMBER, 0); }
		public EosContext eos() {
			return getRuleContext(EosContext.class,0);
		}
		public ParamStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_paramStatement; }
	}

	public final ParamStatementContext paramStatement() throws RecognitionException {
		ParamStatementContext _localctx = new ParamStatementContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_paramStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(65);
			match(T__3);
			setState(66);
			match(ID);
			setState(67);
			match(NUMBER);
			setState(68);
			eos();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CommandStatementContext extends ParserRuleContext {
		public LogStatementContext logStatement() {
			return getRuleContext(LogStatementContext.class,0);
		}
		public CommandStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_commandStatement; }
	}

	public final CommandStatementContext commandStatement() throws RecognitionException {
		CommandStatementContext _localctx = new CommandStatementContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_commandStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(70);
			logStatement();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LogStatementContext extends ParserRuleContext {
		public TerminalNode ID() { return getToken(bellParser.ID, 0); }
		public EosContext eos() {
			return getRuleContext(EosContext.class,0);
		}
		public LogStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_logStatement; }
	}

	public final LogStatementContext logStatement() throws RecognitionException {
		LogStatementContext _localctx = new LogStatementContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_logStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(72);
			match(T__4);
			setState(73);
			match(ID);
			setState(74);
			eos();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 4:
			return eos_sempred((EosContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean eos_sempred(EosContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return this.lineTerminatorAhead();
		}
		return true;
	}

	public static final String _serializedATN =
		"\u0004\u0001\tM\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0001\u0000\u0003\u0000\u001c\b\u0000\u0001\u0000\u0001\u0000"+
		"\u0001\u0001\u0001\u0001\u0001\u0002\u0004\u0002#\b\u0002\u000b\u0002"+
		"\f\u0002$\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003*\b\u0003\u0001"+
		"\u0004\u0001\u0004\u0003\u0004.\b\u0004\u0001\u0005\u0001\u0005\u0003"+
		"\u00052\b\u0005\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\b\u0001\b\u0003\b<\b\b\u0001\t\u0001\t\u0001"+
		"\t\u0001\t\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n\u0001\u000b\u0001\u000b"+
		"\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0000\u0000\r\u0000\u0002\u0004"+
		"\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u0000\u0000F\u0000\u001b"+
		"\u0001\u0000\u0000\u0000\u0002\u001f\u0001\u0000\u0000\u0000\u0004\"\u0001"+
		"\u0000\u0000\u0000\u0006)\u0001\u0000\u0000\u0000\b-\u0001\u0000\u0000"+
		"\u0000\n1\u0001\u0000\u0000\u0000\f3\u0001\u0000\u0000\u0000\u000e6\u0001"+
		"\u0000\u0000\u0000\u0010;\u0001\u0000\u0000\u0000\u0012=\u0001\u0000\u0000"+
		"\u0000\u0014A\u0001\u0000\u0000\u0000\u0016F\u0001\u0000\u0000\u0000\u0018"+
		"H\u0001\u0000\u0000\u0000\u001a\u001c\u0003\u0004\u0002\u0000\u001b\u001a"+
		"\u0001\u0000\u0000\u0000\u001b\u001c\u0001\u0000\u0000\u0000\u001c\u001d"+
		"\u0001\u0000\u0000\u0000\u001d\u001e\u0005\u0000\u0000\u0001\u001e\u0001"+
		"\u0001\u0000\u0000\u0000\u001f \u0003\u0006\u0003\u0000 \u0003\u0001\u0000"+
		"\u0000\u0000!#\u0003\u0002\u0001\u0000\"!\u0001\u0000\u0000\u0000#$\u0001"+
		"\u0000\u0000\u0000$\"\u0001\u0000\u0000\u0000$%\u0001\u0000\u0000\u0000"+
		"%\u0005\u0001\u0000\u0000\u0000&*\u0003\u0010\b\u0000\'*\u0003\n\u0005"+
		"\u0000(*\u0003\u0016\u000b\u0000)&\u0001\u0000\u0000\u0000)\'\u0001\u0000"+
		"\u0000\u0000)(\u0001\u0000\u0000\u0000*\u0007\u0001\u0000\u0000\u0000"+
		"+.\u0005\u0000\u0000\u0001,.\u0004\u0004\u0000\u0000-+\u0001\u0000\u0000"+
		"\u0000-,\u0001\u0000\u0000\u0000.\t\u0001\u0000\u0000\u0000/2\u0003\f"+
		"\u0006\u000002\u0003\u000e\u0007\u00001/\u0001\u0000\u0000\u000010\u0001"+
		"\u0000\u0000\u00002\u000b\u0001\u0000\u0000\u000034\u0005\u0001\u0000"+
		"\u000045\u0003\b\u0004\u00005\r\u0001\u0000\u0000\u000067\u0005\u0002"+
		"\u0000\u000078\u0003\b\u0004\u00008\u000f\u0001\u0000\u0000\u00009<\u0003"+
		"\u0012\t\u0000:<\u0003\u0014\n\u0000;9\u0001\u0000\u0000\u0000;:\u0001"+
		"\u0000\u0000\u0000<\u0011\u0001\u0000\u0000\u0000=>\u0005\u0003\u0000"+
		"\u0000>?\u0005\t\u0000\u0000?@\u0003\b\u0004\u0000@\u0013\u0001\u0000"+
		"\u0000\u0000AB\u0005\u0004\u0000\u0000BC\u0005\u0006\u0000\u0000CD\u0005"+
		"\u0007\u0000\u0000DE\u0003\b\u0004\u0000E\u0015\u0001\u0000\u0000\u0000"+
		"FG\u0003\u0018\f\u0000G\u0017\u0001\u0000\u0000\u0000HI\u0005\u0005\u0000"+
		"\u0000IJ\u0005\u0006\u0000\u0000JK\u0003\b\u0004\u0000K\u0019\u0001\u0000"+
		"\u0000\u0000\u0006\u001b$)-1;";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}