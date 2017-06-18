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
    this.state = {};
  }

  componentWillMount() {
    this.doReset();
  }

  doSelectedPromo = (event) => {
    let id = event ? event.target.value : '';
    let data = this.props.data.getPromotion(id);

    this.setState({formData: data});
  };

  doReset = () => {
    this.doSelectedPromo();
  };

  getFormData = () => _.extend({}, this.state.formData);

  doUpdateForm = (event) => {
    let updated = this.props.data.doUpdatePromotion(this.getFormData());
    (!updated) && this.doReset();
    event.preventDefault();
  };

  doRenderOptions = (dataList) =>
    dataList.map(item => (
      <option key={item.id} value={item.id}>{item.name || '---' }</option>)
    );


  doUpdateField = (event) => {
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value + "";
    let formData = this.getFormData();
    let fields = event.target.name.split('.');

    fields.reduce((curr, next, index) => {
      return (index === fields.length - 1)
        ? curr[next] = value
        : curr[next];
    }, formData);

    this.setState({formData});
  };

  doAddPromotion = (event) => {
    event.preventDefault();
    let formData = this.state.formData;
    formData.conditions.push({
      type: 0,
      quantity: 0
    });

    this.setState({formData});
  };

  renderConditions = () => {
    const {getProducts} = this.props.data;
    const renderProductOptions = this.doRenderOptions(getProducts());

    const promotionElement = this.state.formData.conditions.map((item, index) => (
      <div key={index} className="form-group">
        <div className="form-group col-lg-6">
          <label>Order package</label>
          <select className="form-control"
                  value={item.type} name={`conditions.${index}.type`} onChange={this.doUpdateField.bind(this)}>
            {renderProductOptions}
          </select>
        </div>
        <div className="form-group col-lg-6">
          <label>Quantity</label>
          <input type="number" className="form-control"
                 value={item.quantity} name={`conditions.${index}.quantity`} onChange={this.doUpdateField}
                 required/>
        </div>
      </div>
    ));

    promotionElement.push(<div key="btn" className="form-group col-lg-12">
      <button type="button" className="btn btn-sm btn-default pull-right" onClick={this.doAddPromotion}>
        Add new <i className="glyphicon glyphicon-plus"/>
      </button>
    </div>);
    return promotionElement;

  };


  render() {
    const {promotionNameList, getPromoTypes} = this.props.data;
    const formData = this.state.formData;
    const renderOptions = this.doRenderOptions(promotionNameList);
    const renderPromoTypeOptions = this.doRenderOptions(getPromoTypes());

    const renderConditions = this.renderConditions();

    return (
      <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
        <p className="Rule-intro">
          this is rule component {this.props.data.promotion[1].group}
        </p>
        <form onSubmit={this.doUpdateForm}>
          <div className="form-group col-lg-12">
            <label>Select Promotion</label>
            <select className="form-control"
                    onChange={this.doSelectedPromo} value={formData.id}>
              {renderOptions}
            </select>
          </div>

          <div className="form-group col-lg-12">
            <label> Promotion name</label>
            <input type="text" className="form-control"
                   value={formData.name} name="name" onChange={this.doUpdateField} disabled={formData.id}
                   required/>
          </div>

          <div className="form-group col-lg-12">
            <label> Apply for group</label>
            <input type="text" className="form-control"
                   value={formData.group} name="group" onChange={this.doUpdateField} required/>
          </div>

          {renderConditions}


          <div className="form-group col-lg-6">
            <label>Promotion type</label>
            <select className="form-control"
                    value={formData.promo.type} name="promo.type" onChange={this.doUpdateField}>
              {renderPromoTypeOptions}
            </select>
          </div>

          <div className="form-group col-lg-6">
            <label>Value</label>
            <input type="number" className="form-control"
                   value={formData.promo.value} name="promo.value" onChange={this.doUpdateField} required/>
          </div>

          <div className="checkbox col-lg-6">
            <label htmlFor="isHighPriority">
              <input type="checkbox" className="checkbox" name="isHighPriority"
                     checked={formData.isHighPriority} onChange={this.doUpdateField}/>
              High priority
            </label>

          </div>
          <div className="btn-block col-lg-6">
            <input type="submit" value="Add new / Update" className="btn btn-info col-lg-5"/>
            <input type="button" value="Clear" className="btn btn-default col-lg-5 col-lg-offset-2"
                   onClick={this.doReset}/>
          </div>
        </form>
      </div>
    );
  }
});

export default PromotionRule;
