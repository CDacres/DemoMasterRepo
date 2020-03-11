/* tslint:disable:max-line-length */
import * as React from 'react';

// Connectors
import { useLang } from '@src/store/connectors';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Types
import { Store } from '@src/typings/types';

type ContentType = {
  count?: number;
  placeholder?: object;
  replacements?: object;
  transKey?: string;
};

type AttributesType = {
  [propName: string]: ContentType;
};

type ChildProps = {
  [propName: string]: any;
};

type Props = {
  attributes?: AttributesType;
  children?: JSX.Element | JSX.Element[];
  className?: string;
  content?: ContentType;
  handleError?: (error: object) => void;
  lang?: Store.Lang;
  nestedAttributes?: object;
  reference?: (translation: string) => void;
  store?: object;
  storeSubscription?: any;
};

class Translatable extends React.Component<Props> {
  protected translationHelper;

  constructor(props: Props) {
    super(props);
    this.translationHelper = new TranslationHelper({ messages: props.lang });
  }

  applyPropsAndContentToChildren = (props, content = null) => {
    const { children } = this.props;
    return React.Children.map(children, (child: JSX.Element) => {
      const propsToApply = {
        ...child.props,
        ...props,
      };
      for (const key in child.props) {
        if (child.props.hasOwnProperty(key) && props[key]) {
          if (props[key] instanceof Object) {
            propsToApply[key] = {
              ...child.props[key],
              ...props[key],
            };
          } else if (typeof props[key] === 'string') {
            propsToApply[key] = `${child.props[key]} ${props[key]}`;
          }
        }
      }
      if (props.nestedAttributes) {
        for (const key in child.props) {
          if (child.props.hasOwnProperty(key) && props.nestedAttributes[key]) {
            const prop = child.props[key];
            if (prop && prop instanceof Object && propsToApply[key]) {
              propsToApply[key] = {
                ...prop,
                ...props[key],
              };
            }
          }
        }
      }
      let updatedChild = React.cloneElement(child, propsToApply, content);
      if (child.props.children) {
        updatedChild = React.cloneElement(child, propsToApply, child.props.children);
      }
      return updatedChild;
    });
  }

  handleAttributes = (object: AttributesType | ContentType) => {
    const mungedAttrs = { ...object };
    for (const key in mungedAttrs) {
      if (typeof mungedAttrs[key] !== 'string') {
        if (mungedAttrs.hasOwnProperty(key)) {
          const attribute = mungedAttrs[key];
          if (attribute) {
            if (!attribute.hasOwnProperty('transKey')) {
              mungedAttrs[key] = this.handleAttributes(attribute);
            } else {
              const transString = this.mungeString(attribute);
              mungedAttrs[key] = transString;
            }
          }
        }
      }
    }
    return mungedAttrs;
  }

  handleNestedAttributes = (props: ChildProps) => {
    const newProps = {
      ...props,
    };
    for (const key in newProps.nestedAttributes) {
      if (newProps.nestedAttributes.hasOwnProperty(key)) {
        const nestedAttribute = newProps.nestedAttributes[key];
        if (nestedAttribute) {
          for (const k in nestedAttribute) {
            if (nestedAttribute.hasOwnProperty(k)) {
              const attribute = nestedAttribute[k];
              if (attribute) {
                const transString = this.mungeString(attribute);
                newProps[key] = {};
                newProps[key][k] = transString;
              }
            }
          }
        }
      }
    }
    return newProps;
  }

  mungeString = ({ transKey, count, replacements }: ContentType) => {
    const { handleError, reference } = this.props;
    let translation;
    if (typeof count !== 'undefined') {
      translation = this.translationHelper.choice(transKey, count, replacements);
    } else if (typeof count === 'undefined' && typeof replacements !== 'undefined') {
      if (handleError) {
        handleError({ message: 'Replacements were given without the required count property', name: 'No count supplied' });
      } else {
        throw new Error('Replacements were given without the required count property');
      }
    } else {
      translation = this.translationHelper.get(transKey);
    }
    if (reference) {
      reference(translation);
    }
    return translation;
  }

  render() {
    const { attributes, children, content, handleError, nestedAttributes } = this.props;
    let { className } = this.props;
    if (children && React.Children.count(children) > 1) {
      if (handleError) {
        handleError({ message: 'The Translatable component only allows a single child', name: 'Too many children' });
      } else {
        throw new Error('The Translatable component only allows a single child');
      }
    }
    if (className) {
      className = `translatable ${className}`;
    } else {
      className = 'translatable';
    }
    let props = {};
    if (attributes) {
      const mungedAttrs = this.handleAttributes(attributes);
      props = {
        ...props,
        ...mungedAttrs,
      };
    }
    if (nestedAttributes) {
      props = this.handleNestedAttributes(props);
    }
    if (children) {
      let childrenWithProps;
      if (content) {
        const translatedString = this.mungeString(content);
        childrenWithProps = this.applyPropsAndContentToChildren(props, translatedString);
      } else {
        childrenWithProps = this.applyPropsAndContentToChildren(props);
      }
      const component = childrenWithProps[0];
      return React.createElement(component.type, component.props);
    }
    return (
      <span
        className={className}
        {...props}
      >
        {this.mungeString(content)}
      </span>
    );
  }
}

export default Translatable;
export const ConnectedTranslatable = useLang(Translatable);
