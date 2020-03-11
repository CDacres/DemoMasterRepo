import { View } from '@src/core';
import { Model } from './Models';

export interface EntryEditProp<TEntry> {
  entry: TEntry;
}

export abstract class EntryEdit<TEntry, TModel extends Model = Model, P = {}, S = {}>
  extends View<TModel, P & EntryEditProp<TEntry>, S> {
  get entry() {
    return this.props.entry;
  }

  applyChange = (field: keyof TEntry) => (value: number | string | string[]) => {
    if (!this.model) {
      return;
    }
    const fieldChange: any = { [field]: value };
    this.model.applyChanges(this.props.entry, fieldChange);
  }

  patchField = (target: TEntry, field: keyof TEntry) => (value: any) => {
    if (!this.model) {
      return;
    }
    const fieldChange: any = { [field]: value };
    this.model.applyChanges(target, fieldChange);
  }

  handleChange = (name: keyof TEntry) => (e: any) => {
    if (this.model) {
      const change: any = { [name]: e.target.value };
      this.model.applyChanges(this.props.entry, change);
    }
  }

  handleIntChange = (name: keyof TEntry, nullable: boolean = true) => (e: any) => {
    if (this.model) {
      const sv = e.target.value.toString() as string;
      const nv = sv && parseInt(sv, 10) || (nullable ? null : 0);
      const change: any = { [name]: nv };
      this.model.applyChanges(this.props.entry, change);
    }
  }

  handleSelectChange = (name: keyof TEntry) => (e: { value: any }) => {
    if (this.model) {
      const change: any = { [name]: e.value };
      this.model.applyChanges(this.props.entry, change);
    }
  }

  handleChecked = (name: keyof TEntry, negate: boolean = false) => (_: any, checked: boolean) => {
    if (this.model) {
      const change: any = { [name]: negate ? !checked : checked };
      this.model.applyChanges(this.props.entry, change);
    }
  }
}
