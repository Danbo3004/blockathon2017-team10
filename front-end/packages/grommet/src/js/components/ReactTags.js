import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { WithContext as ReactTagsInput } from 'react-tag-input';
import concat from 'lodash/concat';
import { Scrollbars } from 'react-custom-scrollbars';

import FormField from './FormField';
import Box from './Box';
import Anchor from './Anchor';
import AutoSuggest from './AutoSuggest';
import Close from './icons/base/Close';
import CSSClassnames from '../utils/CSSClassnames';
import { randomString } from '../utils/General';

const CLASS_ROOT = CSSClassnames.TAGS_INPUT;

class ReactTags extends Component {
  constructor(props) {
    super();

    this.els = {};

    var state = {
      showMore: false
    };

    if (props.selectingOnly) {
      state.selectedWrapperWidth = 0;
    }

    this.state = state;

    /* This temp variable only for fast reload suggestions list
     * 
     * What we think this component run
     * We have list of suggestions from props: [A, B, C, D]
     * and list of selected suggestions from props: [A]
     * => List of suggestions we get from getSuggestions function: [B, C, D]
     * 
     * When we select a suggestions, for example `B`. AutoSuggest will call onSuggestionSelected function
     * This method will add B to list of selected suggestions: [A] => [A, B]
     * Then call getSuggestions function: [C, D]
     * 
     * Because there is a delay when run function onSuggestionSelected. 
     * It make getSuggestions function return wrong data => [B, C, D] instead of [C, D]
     * => This component render wrong suggestion list.
     * 
     * This variable is used to pass over the delay issue
     */
    this.tmpSelectedTags = props.selectedTags || [];

    this._getSuggestions = this._getSuggestions.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  componentDidMount() {
    const { overflowScroll, maxHeight } = this.props;
    if (overflowScroll) {
      let selectedWrapperWidth = this.els.selectedWrapper.clientWidth;
      this.setState({
        selectedWrapperWidth: selectedWrapperWidth
      });
    }
    if (maxHeight > 0) {
      let reactTagHeight = this.els.ReactTagsInput.clientHeight;
      if (reactTagHeight - 10 > maxHeight) {
        this.setState({
          showMore: true
        });
      }
    }
  }

  _onSelectSuggestion(suggestion) {
    const selectedTags = concat(this.props.selectedTags, suggestion);
    this.tmpSelectedTags.push(suggestion);

    const { onChange } = this.props;
    if (onChange) onChange(selectedTags);
  }

  _onRemoveTag(tag) {
    const selectedTags = this.props.selectedTags.filter(t => t.id !== tag.id);
    this.tmpSelectedTags = this.tmpSelectedTags.filter(t => t.id !== tag.id);

    const { onChange } = this.props;
    if (onChange) onChange(selectedTags);
  }

  _onBlur(value) {
    if (this.props.handleAddition) {
      this.props.handleAddition(value);
    }
  }

  _showMore() {
    this.setState({ showMore: false });
  }

  _renderNormalComponent() {
    const { placeholder, label, id, error, tags, ...rest } = this.props;
    const { showMore } = this.state;

    const classes = classnames({
      ReactTags__tags: 1,
      'full-width-input': (tags || []).length == 0,
      'show-more': showMore
    });

    return label ? (
      <FormField label={label} error={error} htmlFor={id}>
        <ReactTagsInput
          ref={input => (this.els.ReactTagsInput = input)}
          id={id}
          tags={tags}
          handleInputBlur={this._onBlur}
          placeholder={(tags || []).length ? '' : placeholder}
          {...rest}
          removeComponent={RemoveComponent}
          classNames={{ tags: classes }}
        />
        {showMore ? (
          <Anchor
            className="ReactTags__tags show-more-button"
            onClick={this._showMore.bind(this)}
            label="Xem thêm..."
            size="small"
          />
        ) : null}
      </FormField>
    ) : (
      <ReactTagsInput
        ref={input => (this.els.ReactTagsInput = input)}
        tags={tags}
        handleInputBlur={this._onBlur}
        placeholder={(tags || []).length ? '' : placeholder}
        {...rest}
        removeComponent={RemoveComponent}
        classNames={{ tags: classes }}
      />
    );
  }

  _renderSelectedComponent() {
    const { overflowScroll, selectedTags } = this.props;

    const selectedComponent = selectedTags.length ? (
      <div className="ReactTags__selected">
        {selectedTags.map((tag, pos) => {
          return (
            <span className="ReactTags__tag" key={pos}>
              {tag.name}
              <RemoveComponent onClick={() => this._onRemoveTag(tag)} />
            </span>
          );
        })}
      </div>
    ) : null;

    return overflowScroll ? (
      <Scrollbars style={{ height: '24px', width: this.state.selectedWrapperWidth }}>
        {selectedComponent}
      </Scrollbars>
    ) : (
      selectedComponent
    );
  }

  _getSuggestions(value) {
    const { suggestions, selectedTags } = this.props;
    console.log(suggestions, selectedTags);
    // return suggestions.filter(suggestion => selectedTags.map(tag => tag.id).indexOf(suggestion.id) < 0)
    const selectedTagIds = this.tmpSelectedTags.map(tag => tag.id);
    return suggestions.filter(suggestion => selectedTagIds.indexOf(suggestion.id) < 0);
  }

  _renderSelectingComponent() {
    const { placeholder, suggestions, label, error } = this.props;

    const id = randomString(5);

    return (
      <FormField label={label} error={error} htmlFor={id} className={`${CLASS_ROOT}__form-field`}>
        <Box
          className={`${CLASS_ROOT} ${CLASS_ROOT}--selecting`}
          ref={wrapper => (this.els.selectedWrapper = wrapper)}
        >
          {this._renderSelectedComponent()}
          <AutoSuggest
            placeholder={placeholder}
            data={suggestions}
            onSuggestionSelected={(event, { suggestion }) => this._onSelectSuggestion(suggestion)}
            clearAfterSelecting
            alwaysRenderSuggestions
            getSuggestions={this._getSuggestions}
            inputProps={{
              id,
              value: '',
              onChange: () => {}
            }}
          />
        </Box>
      </FormField>
    );
  }

  render() {
    const { selectingOnly } = this.props;

    return selectingOnly ? this._renderSelectingComponent() : this._renderNormalComponent();
  }
}
ReactTags.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.node,
  error: PropTypes.string,
  selectingOnly: PropTypes.bool,
  selectedTags: PropTypes.array,
  overflowScroll: PropTypes.bool,
  popoverError: PropTypes.bool,
  showMore: PropTypes.bool,
  maxHeight: PropTypes.number
};

ReactTags.defaultProps = {
  selectingOnly: false,
  selectedTags: [],
  overflowScroll: false,
  popoverError: false,
  maxHeight: -1
};

class RemoveComponent extends React.Component {
  render() {
    return (
      <a {...this.props} className={`${CLASS_ROOT}__remove-icon`}>
        <Close size="tiny" />
      </a>
    );
  }
}
export default ReactTags;
