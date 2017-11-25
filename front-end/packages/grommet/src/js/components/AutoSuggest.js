/**
 * Created by @VanNguyen: nguyenkhoavan@outlook.com on 2/4/17.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import CSSClassnames, {namespace} from '../utils/CSSClassnames';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import Box from './Box';
import Button from './Button'
import SearchIcon from './icons/base/Search'
import ClearIcon from './icons/base/Close'

const CLASS_ROOT                   = CSSClassnames.AUTOSUGGEST;
const AUTOSUGGEST_INPUT_CLASS_ROOT = `${CLASS_ROOT}-input`;

export default class AutoSuggest extends Component {

  constructor(props, context) {
    super(props, context);

    this._onInputChange               = this._onInputChange.bind(this);
    this._onSuggestionsFetchRequested = this._onSuggestionsFetchRequested.bind(this);
    this._onSuggestionsClearRequested = this._onSuggestionsClearRequested.bind(this);
    this._onSuggestionSelected        = this._onSuggestionSelected.bind(this);
    // this._onClear                     = this._onClear.bind(this);

    // AutoSuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the AutoSuggest,
    // and they are initially empty because the AutoSuggest is closed.
    this.state = {
      value      : props.value,
      suggestions: []
    };
  }

  _onInputChange(event, {newValue, method}) {
    this.setState({
      value: newValue
    });
  };

  // AutoSuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  _onSuggestionsFetchRequested({value}) {
    this.setState({
      suggestions: this._getSuggestions(value)
    });
  };

  // AutoSuggest will call this function every time you need to clear suggestions.
  _onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  _onSuggestionSelected(event, data) {
    const {onSuggestionSelected, clearAfterSelecting} = this.props

    if (onSuggestionSelected) onSuggestionSelected(event, data)

    if (clearAfterSelecting) this.setState({
      value: ''
    })

  }

  escapeRegexCharacters(str) {
    str = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Remove unicode
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }

  // Teach AutoSuggest how to calculate suggestions for any given input value.
  _getSuggestions(value) {
    const {getSuggestions} = this.props

    if (getSuggestions) {
      return getSuggestions(value)
    } else {
      const escapedValue = this.escapeRegexCharacters(value.trim());

      if (escapedValue === '') {
        return this.props.data;
      }

      const regex = new RegExp('\\b' + escapedValue, 'i');

      return this.props.data.filter(item => regex.test(this.escapeRegexCharacters(this._getSuggestionValue(item))));
    }
  };

  // When suggestion is clicked, AutoSuggest needs to populate the input element
  // based on the clicked suggestion. Teach AutoSuggest how to calculate the
  // input value for every given suggestion.
  _getSuggestionValue(suggestion) {
    return suggestion.name;
  };

  // Use your imagination to render suggestions.
  _renderSuggestion(suggestion, {query}) {
    const suggestionText = `${suggestion.name}`;
    const matches        = AutosuggestHighlightMatch(suggestionText, query);
    const parts          = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <span className={'suggestion-content ' + suggestion.id}>
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;

            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
    );
  }

  _onClear(event) {
    const {onClear} = this.props
    if (onClear) onClear(event);

    this.setState({
      value: ''
    });
  }

  _renderClearComponent() {
    return (
      <Button
        className={`${CLASS_ROOT}__closer`}
        plain={true}
        href='#'
        onClick={(event) => {
          this._onClear(event)
        }}
        icon={<ClearIcon className={`${CLASS_ROOT}__closer-icon__close`}/>}
        a11yTitle={'Clear all'}
      />
    );
  }

  _renderSearchIcon() {
    const {className, searchIcon} = this.props;

    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--search-icon`]: searchIcon
      },
      className
    );
    return <SearchIcon className={classes}/>
  }

  render() {
    const {className, placeHolder, data, size, searchIcon, clearComponent, alwaysRenderSuggestions, 
      onelineOption, disableInput, ...rest} = this.props;
    delete rest.onClear;

    let {value, suggestions} = this.state;

    // AutoSuggest will pass through all these props to the input element.
    let inputClasses = classnames(
      AUTOSUGGEST_INPUT_CLASS_ROOT,
      {
        [`${AUTOSUGGEST_INPUT_CLASS_ROOT}--${size}`]: size,
        [`${namespace}input`]                      : true
      }
    );
    const inputProps = {
      placeholder: placeHolder,
      value,
      onChange   : this._onInputChange,
      disabled   : disableInput
    };

    let magContainerClasses = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}__search-icon`]    : searchIcon,
        [`${CLASS_ROOT}__clear-component`]: clearComponent,
        [`${CLASS_ROOT}--one-line-option`]: onelineOption,
        [`${CLASS_ROOT}--${size}`]        : size
      }
    );

    let classes = classnames(
      CLASS_ROOT
    );

    let theme = {
      container           : `${classes}__container`,
      containerOpen       : `${classes}__container--open`,
      input               : inputClasses,
      suggestionsContainer: `${classes}__suggestions-container`,
      suggestionsList     : `${classes}__suggestions-list`,
      suggestion          : `${classes}__suggestion`,
      suggestionFocused   : `${classes}__suggestion--focused`,
      sectionContainer    : `${classes}__section-container`,
      sectionTitle        : `${classes}__section-title`
    }

    // Finally, render it!

    return (
      <Box className={magContainerClasses} direction="row" align="center" alignContent="between">
        {searchIcon ? this._renderSearchIcon() : null}
        <Autosuggest
          {...rest}
          theme={theme}
          data={data}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this._onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this._onSuggestionsClearRequested}
          getSuggestionValue={this._getSuggestionValue}
          onSuggestionSelected={this._onSuggestionSelected}
          renderSuggestion={this._renderSuggestion}
          inputProps={inputProps}
          shouldRenderSuggestions={() => true}
          alwaysRenderSuggestions={alwaysRenderSuggestions}
        />
        {clearComponent ? this._renderClearComponent() : null}
      </Box>
    );
  }
};

AutoSuggest.defaultProps = {
  data               : {},
  value              : '',
  size               : 'small',
  clearAfterSelecting: false,
  alwaysRenderSuggestions: false,
  onelineOption      : false,
  disableInput       : false
};

AutoSuggest.propTypes = {
  placeHolder         : PropTypes.string,
  data                : PropTypes.array,
  value               : PropTypes.string,
  size                : PropTypes.string,
  onSuggestionSelected: PropTypes.func,
  onClear             : PropTypes.func,
  clearAfterSelecting : PropTypes.bool,
  getSuggestions      : PropTypes.func,
  searchIcon          : PropTypes.bool,
  clearComponent      : PropTypes.bool,
  onelineOption       : PropTypes.bool,
  alwaysRenderSuggestions: PropTypes.bool,
  disableInput        : PropTypes.bool
};
