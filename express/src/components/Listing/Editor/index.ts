// Core
import { View, Model } from '@src/core';

// Interfaces
import { NumberFormatValue } from '@src/components/Listing/Form';

abstract class Editor<P = {}, S = {}, TModel extends Model = Model>
  extends View<TModel, P, S> {

  onInputChange = <T>(target: T, field: keyof T) => (e: any) => {
    if (!this.model) {
      return;
    }
    const changes: any = { [field]: e.target.value };
    this.model.applyChanges(target, changes);
  }

  onInputIntChange = <T>(target: T, field: keyof T, nullable: boolean = true) => (e: any) => {
    if (!this.model) {
      throw Error('model is undefined');
    }
    const value = e.target.value.toString() as string;
    const newValue = value && parseInt(value, 10) || (nullable ? null : 0);
    const changes: any = { [field]: newValue };
    this.model.applyChanges(target, changes);
  }

  onInputFloatChange = <T>(target: T, field: keyof T, nullable: boolean = true) => (e: any) => {
    if (!this.model) {
      throw Error('model is undefined');
    }
    const value = e.target.value;
    const newValue = value && parseFloat(value) || (nullable ? null : 0);
    const changes: any = { [field]: newValue };
    this.model.applyChanges(target, changes);
  }

  onNumberFloatChange = <T>(target: T, field: keyof T) => (e: NumberFormatValue) => {
    if (!this.model) {
      throw Error('model is undefined');
    }
    const changes: any = { [field]: e.floatValue };
    this.model.applyChanges(target, changes);
  }

  onInputCheckChange = <T>(target: T, field: keyof T, negate: boolean = false) => (_: any, checked: boolean) => {
    if (!this.model) {
      throw Error('model is undefined');
    }
    const changes: any = { [field]: (negate ? !checked : checked) };
    this.model.applyChanges(target, changes);
  }

  onValueChange = <T>(target: T, field: keyof T) => (value: any) => {
    if (!this.model) {
      throw Error('model is undefined');
    }
    const changes: any = { [field]: value };
    this.model.applyChanges(target, changes);
  }
}

export default Editor;
