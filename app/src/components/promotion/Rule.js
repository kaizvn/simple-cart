/**
 * Created by kainguyen on 6/17/17.
 */
import React, { Component } from 'react';
import './Rule.css';
import { observer } from 'mobx-react';
import * as _ from 'lodash';

const PromotionRule = observer(class PromotionRule extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      formData: {}
    };

  }

  componentWillMount() {
    this.doReset();
  }

  doSelectedPromo = (event = null) => {
    if (!event || !event.target.value) {
      return this.setState({formData: this.props.data.defaultRule()});
    }

    const id = event.target.value;

    this.props.data.getPromotion(id)
      .then((resp) => {
        if (resp)
          this.setState({formData: resp.data});
        else
          this.setState({formData: this.props.data.defaultRule()});
      });
  };

  doReset = () => {
    this.doSelectedPromo();
  };

  getFormData = () => _.extend({}, this.state.formData);

  doUpdateForm = (event) => {
    event.preventDefault();
    this.props.data.doUpdatePromotion(this.getFormData(), (resp) => {
      (!resp.data.isUpdate) && this.doReset();
    })

  };

  doRenderOptions = (dataList) => dataList.map(item =>
    ( <option key={item.id} value={item.id}>{item.name || '-none-' }</option>)
  );

  doUpdateField = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value + "";
    const formData = this.getFormData();
    const name = event.target.name;

    const fields = name.split('.');

    fields.reduce((curr, next, index) => {
      return (index === fields.length - 1)
        ? curr[next] = value
        : curr[next];
    }, formData);

    this.setState({formData});
  };

  doAddItem = (field, defaultItem, event) => {
    event.preventDefault();
    const formData = this.state.formData;

    formData[field].push(defaultItem);

    this.setState({formData});
  };

  doRemoveItem = (field, event) => {
    event.preventDefault();
    const formData = this.state.formData;
    const index = event.target.name;
    formData[field].splice(index, 1);

    this.setState({formData});
  };

  renderConditions = (conditions) => {
    const {productList} = this.props.data;
    const options = {
      itemText: 'Order package',
      itemName: 'type',
      valueText: 'Quantity',
      valueName: 'quantity',
      field: 'conditions',
      title: 'Conditions'
    };

    return this.renderDataField(conditions, productList, options);
  };

  renderBonuses = (promo) => {
    const {promotionTypesList} = this.props.data;
    const options = {
      itemText: 'Bonus type',
      itemName: 'type',
      valueText: 'Value',
      valueName: 'value',
      field: 'promos',
      title: 'Bonus'
    };

    return this.renderDataField(promo, promotionTypesList, options);
  };

  renderItemFields = (dataList, optionList, options) => {
    const optionRender = this.doRenderOptions(optionList);

    return dataList.map((item, index) => (
      <div key={index}>
        <div className="form-group col-xs-5 col-md-5">
          <label>{options.itemText}</label>
          <select className="form-control"
                  value={item[options.itemName]} name={`${options.field}.${index}.${options.itemName}`}
                  onChange={this.doUpdateField}
                  required>
            <option value="">---</option>
            {optionRender}
          </select>
        </div>
        <div className="form-group col-xs-5 col-md-5">
          <label>{options.valueText}</label>
          <input type="number" className="form-control"
                 value={item[options.valueName]} data={index} name={`${options.field}.${index}.${options.valueName}`}
                 onChange={this.doUpdateField}
                 required/>
        </div>
        <div className="form-group col-xs-2 col-md-2">
          <button type="button" name={index} className="btn btn-sm btn-default minus-button"
                  onClick={this.doRemoveItem.bind(this, options.field)}>
            <i className="glyphicon glyphicon-minus"/>
          </button>
        </div>
      </div>
    ));
  };

  renderAddButton = (options) => {
    return (
      <div key="btn" className="form-group col-xs-12">
        <button type="button" className="btn btn-sm btn-default pull-right"
                onClick={this.doAddItem.bind(this, options.field, {[options.itemName]: 0, [options.valueName]: ''})}>
          Add new <i className="glyphicon glyphicon-plus"/>
        </button>
      </div>
    );
  };

  renderDataField = (dataList, optionsList, options) => {
    const renderItemFields = this.renderItemFields(dataList, optionsList, options);
    const renderBtnAddPromotion = this.renderAddButton(options);
    return (
      <div className="form-group col-xs-12 clearfix">
        <label>{options.title}</label>
        {renderItemFields}
        {renderBtnAddPromotion}
      </div>);
  };

  render() {
    const {promotionList} = this.props.data;

    const formData = this.state.formData;
    const renderOptions = this.doRenderOptions(promotionList);

    const renderConditions = this.renderConditions(formData.conditions || []);
    const renderBonuses = this.renderBonuses(formData.promos || []);

    return (
      <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
        <p className="Rule-intro">
          this is rule component
        </p>
        <form onSubmit={this.doUpdateForm}>
          <div className="form-group col-xs-12">
            <label>Select Promotion</label>
            <select className="form-control"
                    onChange={this.doSelectedPromo} value={formData.id}>
              <option value="">---</option>
              {renderOptions}
            </select>
          </div>

          <div className="form-group col-xs-12">
            <label> Promotion name</label>
            <input type="text" className="form-control"
                   value={formData.name} name="name" onChange={this.doUpdateField} disabled={formData.id}
                   required/>
          </div>

          <div className="form-group col-xs-12">
            <label> Apply for group</label>
            <input type="text" className="form-control"
                   value={formData.group} name="group" onChange={this.doUpdateField} required/>
          </div>
          {renderConditions}

          {renderBonuses}

          <div className="checkbox col-xs-6 ">
            <label htmlFor="isHighPriority">
              <input type="checkbox" className="checkbox" name="isHighPriority"
                     checked={formData.isHighPriority} onChange={this.doUpdateField}/>
              High priority
            </label>

          </div>
          <div className="btn-block col-xs-12 ">
            <input type="submit" value="Add new / Update" className="btn btn-info col-xs-5"/>
            <input type="button" value="Clear" className="btn btn-default col-xs-5 col-xs-offset-2"
                   onClick={this.doReset}/>
          </div>
        </form>
      </div>
    );
  }
});

export default PromotionRule;
